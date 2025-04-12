
import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MapPin, Upload, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useIssues } from '@/contexts/IssueContext';
import { IssueType } from '@/types';
import { issueTypeLabels } from '@/utils/mockData';
import { getCurrentLocation, getAddressFromCoordinates } from '@/utils/geolocation';

const IssueReporting = () => {
  const navigate = useNavigate();
  const { addIssue } = useIssues();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<IssueType>('pothole');
  const [media, setMedia] = useState<string[]>([]);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
    isLoading?: boolean;
    error?: string;
  }>({
    latitude: 0,
    longitude: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const detectLocation = async () => {
    setLocation(prev => ({ ...prev, isLoading: true, error: undefined }));
    
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      const address = await getAddressFromCoordinates(latitude, longitude);
      
      setLocation({
        latitude,
        longitude,
        address,
        isLoading: false
      });
    } catch (error) {
      console.error('Error getting location:', error);
      setLocation(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to detect your location. Please try again.'
      }));
    }
  };
  
  const handleMediaUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, this would upload to a server and return URLs
    // For this example, we'll use the placeholder
    setMedia([...media, '/placeholder.svg']);
    
    // Reset the input
    e.target.value = '';
  };
  
  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !type || location.latitude === 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addIssue({
        title,
        description,
        type,
        status: 'pending',
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address
        },
        media,
        reportedBy: 'Current User'
      });
      
      navigate('/issues');
    } catch (error) {
      console.error('Error submitting issue:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Report a Civic Issue</h1>
            <p className="text-gray-600 mt-1">
              Help improve our community by reporting issues in your area
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input
                id="title"
                placeholder="E.g., Pothole on Main Street"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Issue Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as IssueType)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select an issue type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(issueTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide details about the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Location</Label>
              <div className="flex flex-col space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={detectLocation}
                  disabled={location.isLoading}
                  className="flex items-center space-x-2 w-full sm:w-auto"
                >
                  {location.isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Detecting location...</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4" />
                      <span>Detect My Location</span>
                    </>
                  )}
                </Button>
                
                {location.error && (
                  <p className="text-sm text-red-500">{location.error}</p>
                )}
                
                {location.latitude !== 0 && (
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p>
                      <strong>Coordinates:</strong> {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                    {location.address && (
                      <p>
                        <strong>Address:</strong> {location.address}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Media</Label>
              <div className="flex flex-wrap gap-2">
                {media.map((src, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={src} 
                      alt={`Uploaded ${index + 1}`} 
                      className="h-24 w-24 object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-200"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
                
                <label className="h-24 w-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <Upload className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Upload</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleMediaUpload} 
                    className="hidden" 
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Upload photos of the issue (max 5 images)
              </p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || location.latitude === 0}
                className="bg-civic-blue hover:bg-civic-blue/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : 'Submit Report'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default IssueReporting;
