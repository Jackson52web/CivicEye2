
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, MapPin } from 'lucide-react';
import { Issue } from '@/types';
import { formatDate, getTimeElapsed } from '@/utils/formatters';
import { issueTypeLabels, statusInfo } from '@/utils/mockData';
import { useIssues } from '@/contexts/IssueContext';

interface IssueCardProps {
  issue: Issue;
  showControls?: boolean;
}

const IssueCard = ({ issue, showControls = true }: IssueCardProps) => {
  const { upvoteIssue } = useIssues();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  
  // Check if this issue has been upvoted before
  useEffect(() => {
    const upvotedIssues = JSON.parse(localStorage.getItem('upvotedIssues') || '{}');
    setHasUpvoted(!!upvotedIssues[issue.id]);
  }, [issue.id]);
  
  const handleUpvote = () => {
    if (!hasUpvoted) {
      upvoteIssue(issue.id);
      setHasUpvoted(true);
      
      // Store upvote status in local storage
      const upvotedIssues = JSON.parse(localStorage.getItem('upvotedIssues') || '{}');
      upvotedIssues[issue.id] = true;
      localStorage.setItem('upvotedIssues', JSON.stringify(upvotedIssues));
    }
  };
  
  return (
    <Card className="w-full h-full hover:shadow-md transition-shadow animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold truncate">{issue.title}</CardTitle>
          <Badge className={statusInfo[issue.status].color}>
            {statusInfo[issue.status].label}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{issue.location.address}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="aspect-video bg-gray-100 rounded-md mb-3 overflow-hidden">
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
        
        <div className="mb-2">
          <Badge variant="outline" className="mr-2 bg-gray-50">
            {issueTypeLabels[issue.type]}
          </Badge>
          <span className="text-xs text-gray-500">
            Reported {getTimeElapsed(issue.createdAt)}
          </span>
        </div>
        
        <p className="text-sm line-clamp-2 text-gray-700">
          {issue.description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex space-x-4">
          {showControls && (
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center space-x-1 ${hasUpvoted ? 'text-civic-blue' : ''}`}
              onClick={handleUpvote}
              disabled={hasUpvoted}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{issue.upvotes}</span>
            </Button>
          )}
          
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <MessageSquare className="h-4 w-4" />
            <span>{issue.comments.length}</span>
          </div>
        </div>
        
        <Button asChild variant="outline" size="sm">
          <Link to={`/issues/${issue.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IssueCard;
