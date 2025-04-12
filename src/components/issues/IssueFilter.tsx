
import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { IssueType, StatusType } from '@/types';
import { issueTypeLabels, statusInfo } from '@/utils/mockData';

interface IssueFilterProps {
  onFilterChange: (filters: { status?: StatusType; type?: IssueType; sortBy?: string }) => void;
}

const IssueFilter = ({ onFilterChange }: IssueFilterProps) => {
  const [status, setStatus] = useState<StatusType | 'all'>('all');
  const [type, setType] = useState<IssueType | 'all'>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  
  const handleStatusChange = (value: string) => {
    const newStatus = value as StatusType | 'all';
    setStatus(newStatus);
    onFilterChange({ 
      status: newStatus === 'all' ? undefined : newStatus,
      type: type === 'all' ? undefined : type,
      sortBy 
    });
  };
  
  const handleTypeChange = (value: string) => {
    const newType = value as IssueType | 'all';
    setType(newType);
    onFilterChange({ 
      status: status === 'all' ? undefined : status,
      type: newType === 'all' ? undefined : newType,
      sortBy 
    });
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    onFilterChange({ 
      status: status === 'all' ? undefined : status,
      type: type === 'all' ? undefined : type,
      sortBy: value 
    });
  };
  
  const resetFilters = () => {
    setStatus('all');
    setType('all');
    setSortBy('newest');
    onFilterChange({});
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Status</label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.entries(statusInfo).map(([value, { label }]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Issue Type</label>
          <Select value={type} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(issueTypeLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Sort By</label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort issues" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="upvotes">Most Upvotes</SelectItem>
              <SelectItem value="comments">Most Comments</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueFilter;
