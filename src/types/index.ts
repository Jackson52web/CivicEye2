
// Issue Status Types
export type StatusType = 'pending' | 'inProgress' | 'resolved';

// Issue Categories
export type IssueType = 
  | 'pothole' 
  | 'streetlight' 
  | 'garbage' 
  | 'waterLeak' 
  | 'graffiti' 
  | 'sidewalk' 
  | 'trafficLight' 
  | 'other';

// Comment type
export interface Comment {
  id: string;
  issueId: string;
  author: string;
  isAdmin: boolean;
  content: string;
  createdAt: string;
}

// Main Issue type
export interface Issue {
  id: string;
  title: string;
  description: string;
  type: IssueType;
  status: StatusType;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  media: string[];
  upvotes: number;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  reportedBy: string;
}

// Application contexts and stores
export interface IssueContextType {
  issues: Issue[];
  addIssue: (issue: Omit<Issue, 'id' | 'upvotes' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateIssueStatus: (id: string, status: StatusType) => void;
  upvoteIssue: (id: string) => void;
  addComment: (issueId: string, comment: Omit<Comment, 'id' | 'issueId' | 'createdAt'>) => void;
  getIssueById: (id: string) => Issue | undefined;
}
