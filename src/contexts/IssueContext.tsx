
import { createContext, useContext, useState, ReactNode } from 'react';
import { Issue, IssueContextType, StatusType, Comment } from '@/types';
import { toast } from 'sonner';
import { mockIssues } from '@/utils/mockData';

// Create the context
const IssueContext = createContext<IssueContextType | undefined>(undefined);

// Provider component
export const IssueProvider = ({ children }: { children: ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);

  // Add a new issue
  const addIssue = (issue: Omit<Issue, 'id' | 'upvotes' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const newIssue: Issue = {
      ...issue,
      id: Date.now().toString(),
      upvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };
    
    setIssues(prev => [newIssue, ...prev]);
    toast.success('Issue reported successfully!');
  };

  // Update issue status
  const updateIssueStatus = (id: string, status: StatusType) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === id
          ? {
              ...issue,
              status,
              updatedAt: new Date().toISOString()
            }
          : issue
      )
    );
    toast.success(`Issue status updated to ${status.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
  };

  // Upvote an issue
  const upvoteIssue = (id: string) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === id
          ? {
              ...issue,
              upvotes: issue.upvotes + 1
            }
          : issue
      )
    );
    toast.success('Issue upvoted!');
  };

  // Add a comment to an issue
  const addComment = (issueId: string, comment: Omit<Comment, 'id' | 'issueId' | 'createdAt'>) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === issueId
          ? {
              ...issue,
              comments: [
                ...issue.comments,
                {
                  ...comment,
                  id: Date.now().toString(),
                  issueId,
                  createdAt: new Date().toISOString()
                }
              ],
              updatedAt: new Date().toISOString()
            }
          : issue
      )
    );
    toast.success('Comment added!');
  };

  // Get an issue by ID
  const getIssueById = (id: string) => {
    return issues.find(issue => issue.id === id);
  };

  // Value to be provided
  const value = {
    issues,
    addIssue,
    updateIssueStatus,
    upvoteIssue,
    addComment,
    getIssueById
  };

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>;
};

// Custom hook for using the context
export const useIssues = (): IssueContextType => {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};
