
import { useState, useMemo } from 'react';
import IssueCard from './IssueCard';
import IssueFilter from './IssueFilter';
import { Issue, IssueType, StatusType } from '@/types';
import { useIssues } from '@/contexts/IssueContext';

const IssueList = () => {
  const { issues } = useIssues();
  const [filters, setFilters] = useState<{
    status?: StatusType;
    type?: IssueType;
    sortBy?: string;
  }>({
    sortBy: 'newest'
  });
  
  const filteredIssues = useMemo(() => {
    let result = [...issues];
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(issue => issue.status === filters.status);
    }
    
    // Apply type filter
    if (filters.type) {
      result = result.filter(issue => issue.type === filters.type);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'upvotes':
        result.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'comments':
        result.sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        break;
    }
    
    return result;
  }, [issues, filters]);
  
  return (
    <div>
      <IssueFilter onFilterChange={setFilters} />
      
      {filteredIssues.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No issues found</h3>
          <p className="text-gray-500">
            Try changing your filters or report a new issue.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IssueList;
