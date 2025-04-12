
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Comment } from '@/types';
import { formatDate } from '@/utils/formatters';
import { useIssues } from '@/contexts/IssueContext';

interface CommentListProps {
  issueId: string;
  comments: Comment[];
  isAdmin?: boolean;
}

const CommentList = ({ issueId, comments, isAdmin = false }: CommentListProps) => {
  const { addComment } = useIssues();
  const [commentContent, setCommentContent] = useState('');
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      addComment(issueId, {
        author: isAdmin ? 'CityAdmin' : 'You',
        isAdmin,
        content: commentContent
      });
      setCommentContent('');
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmitComment} className="space-y-2">
        <Textarea 
          placeholder={isAdmin ? "Add an official response..." : "Add your comment..."}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="w-full resize-none"
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!commentContent.trim()}
            className={isAdmin ? "bg-civic-blue hover:bg-civic-blue/90" : ""}
          >
            {isAdmin ? "Post Official Response" : "Post Comment"}
          </Button>
        </div>
      </form>
      
      <div className="space-y-4 mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div 
              key={comment.id} 
              className={`p-4 rounded-lg ${comment.isAdmin ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}
            >
              <div className="flex space-x-3">
                <Avatar>
                  <AvatarFallback className={comment.isAdmin ? 'bg-civic-blue text-white' : 'bg-gray-200'}>
                    {comment.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="font-medium">{comment.author}</span>
                      {comment.isAdmin && (
                        <span className="ml-2 text-xs bg-civic-blue text-white px-2 py-0.5 rounded">Staff</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
