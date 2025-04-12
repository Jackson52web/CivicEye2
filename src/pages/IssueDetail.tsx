
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  ThumbsUp, 
  ArrowLeft, 
  User,
  Clock
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import CommentList from '@/components/issues/CommentList';
import IssueStatusBadge from '@/components/issues/IssueStatusBadge';
import { useIssues } from '@/contexts/IssueContext';
import { issueTypeLabels } from '@/utils/mockData';
import { formatDate } from '@/utils/formatters';
import { useState, useEffect } from 'react';

const IssueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getIssueById, upvoteIssue } = useIssues();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  
  const issue = getIssueById(id || '');
  
  // Get upvote status from local storage
  useEffect(() => {
    if (id) {
      const upvotedIssues = JSON.parse(localStorage.getItem('upvotedIssues') || '{}');
      setHasUpvoted(!!upvotedIssues[id]);
    }
  }, [id]);
  
  if (!issue) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Issue Not Found</h2>
          <p className="mb-6">The issue you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/issues')}>
            Go Back to Issues
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleUpvote = () => {
    if (!hasUpvoted && id) {
      upvoteIssue(issue.id);
      setHasUpvoted(true);
      
      // Store upvote status in local storage
      const upvotedIssues = JSON.parse(localStorage.getItem('upvotedIssues') || '{}');
      upvotedIssues[id] = true;
      localStorage.setItem('upvotedIssues', JSON.stringify(upvotedIssues));
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-video bg-gray-100">
                {issue.media && issue.media.length > 0 ? (
                  <img 
                    src={issue.media[0]} 
                    alt={issue.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
                  <IssueStatusBadge status={issue.status} className="text-sm" />
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{issue.location.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Reported on {formatDate(issue.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>By {issue.reportedBy}</span>
                  </div>
                  {issue.updatedAt !== issue.createdAt && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Updated {formatDate(issue.updatedAt)}</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 whitespace-pre-line">{issue.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {issueTypeLabels[issue.type]}
                    </span>
                  </div>
                  
                  <Button 
                    variant={hasUpvoted ? "default" : "outline"} 
                    size="sm"
                    onClick={handleUpvote}
                    disabled={hasUpvoted}
                    className={hasUpvoted ? "bg-civic-blue hover:bg-civic-blue/90" : ""}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    <span>{issue.upvotes} Upvotes</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CommentList 
                issueId={issue.id} 
                comments={issue.comments} 
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-gray-400" />
                <span className="sr-only">Map would go here in production</span>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Coordinates:</strong><br />
                Latitude: {issue.location.latitude.toFixed(6)}<br />
                Longitude: {issue.location.longitude.toFixed(6)}
              </p>
              {issue.location.address && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Address:</strong><br />
                  {issue.location.address}
                </p>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Issue Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-status-pending flex-shrink-0 flex items-center justify-center text-white text-xs">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Reported</p>
                    <p className="text-sm text-gray-500">{formatDate(issue.createdAt)}</p>
                  </div>
                </div>
                
                {issue.status === 'inProgress' || issue.status === 'resolved' ? (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-status-inProgress flex-shrink-0 flex items-center justify-center text-white text-xs">
                      2
                    </div>
                    <div>
                      <p className="font-medium">In Progress</p>
                      <p className="text-sm text-gray-500">
                        {issue.updatedAt !== issue.createdAt ? formatDate(issue.updatedAt) : 'Date not available'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white text-xs">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">In Progress</p>
                      <p className="text-sm text-gray-400">Pending</p>
                    </div>
                  </div>
                )}
                
                {issue.status === 'resolved' ? (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-status-resolved flex-shrink-0 flex items-center justify-center text-white text-xs">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Resolved</p>
                      <p className="text-sm text-gray-500">{formatDate(issue.updatedAt)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white text-xs">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">Resolved</p>
                      <p className="text-sm text-gray-400">Pending</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IssueDetail;
