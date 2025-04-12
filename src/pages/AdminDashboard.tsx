
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  BarChart3,
  CheckCircle2, 
  ClipboardList, 
  Clock, 
  MessageSquare, 
  ThumbsUp
} from 'lucide-react';
import { Issue, StatusType } from '@/types';
import { formatDate } from '@/utils/formatters';
import { issueTypeLabels, statusInfo } from '@/utils/mockData';
import { useIssues } from '@/contexts/IssueContext';
import CommentList from '@/components/issues/CommentList';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { issues, updateIssueStatus } = useIssues();
  const navigate = useNavigate();
  
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const pendingCount = issues.filter(issue => issue.status === 'pending').length;
  const inProgressCount = issues.filter(issue => issue.status === 'inProgress').length;
  const resolvedCount = issues.filter(issue => issue.status === 'resolved').length;
  
  const totalUpvotes = issues.reduce((sum, issue) => sum + issue.upvotes, 0);
  const totalComments = issues.reduce((sum, issue) => sum + issue.comments.length, 0);
  
  const handleStatusChange = (status: StatusType) => {
    if (selectedIssue) {
      updateIssueStatus(selectedIssue.id, status);
      setSelectedIssue({
        ...selectedIssue,
        status
      });
    }
  };
  
  const openIssueDetails = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDialogOpen(true);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage and respond to community issues
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Issues</CardDescription>
              <CardTitle className="text-3xl">{issues.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">All time</span>
                <ClipboardList className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-status-pending">{pendingCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Require attention</span>
                <Clock className="h-4 w-4 text-status-pending" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-3xl text-status-inProgress">{inProgressCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Being addressed</span>
                <BarChart3 className="h-4 w-4 text-status-inProgress" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Resolved</CardDescription>
              <CardTitle className="text-3xl text-status-resolved">{resolvedCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Completed</span>
                <CheckCircle2 className="h-4 w-4 text-status-resolved" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
                <CardDescription>
                  Manage and update the status of reported issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Reported</TableHead>
                        <TableHead>Upvotes</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issues.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No issues found
                          </TableCell>
                        </TableRow>
                      ) : (
                        issues.map(issue => (
                          <TableRow key={issue.id}>
                            <TableCell className="font-medium">{issue.title}</TableCell>
                            <TableCell>{issueTypeLabels[issue.type]}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo[issue.status].color}`}>
                                {statusInfo[issue.status].label}
                              </span>
                            </TableCell>
                            <TableCell>{formatDate(issue.createdAt)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1 text-gray-500" />
                                {issue.upvotes}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => openIssueDetails(issue)}
                              >
                                View & Manage
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/issues')}
                >
                  View All Issues
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Community Engagement</CardTitle>
                <CardDescription>
                  Statistics on citizen participation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <ThumbsUp className="h-4 w-4 inline mr-1" />
                      Total Upvotes
                    </span>
                    <span className="font-medium">{totalUpvotes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <MessageSquare className="h-4 w-4 inline mr-1" />
                      Total Comments
                    </span>
                    <span className="font-medium">{totalComments}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Issue Distribution</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Pending</span>
                        <span>{Math.round((pendingCount / issues.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-status-pending h-2 rounded-full"
                          style={{ width: `${(pendingCount / issues.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>In Progress</span>
                        <span>{Math.round((inProgressCount / issues.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-status-inProgress h-2 rounded-full"
                          style={{ width: `${(inProgressCount / issues.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Resolved</span>
                        <span>{Math.round((resolvedCount / issues.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-status-resolved h-2 rounded-full"
                          style={{ width: `${(resolvedCount / issues.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedIssue && (
          <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedIssue.title}</DialogTitle>
              <DialogDescription>
                Reported by {selectedIssue.reportedBy} on {formatDate(selectedIssue.createdAt)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm">{selectedIssue.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Location</h4>
                  <p className="text-sm">{selectedIssue.location.address}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Media</h4>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {selectedIssue.media.map((src, index) => (
                      <img 
                        key={index}
                        src={src} 
                        alt={`Issue ${index + 1}`} 
                        className="h-24 w-24 object-cover rounded"
                      />
                    ))}
                    {selectedIssue.media.length === 0 && (
                      <p className="text-sm text-gray-500">No media attached</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Current Status</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo[selectedIssue.status].color}`}>
                    {statusInfo[selectedIssue.status].label}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Update Status</h4>
                  <Select 
                    value={selectedIssue.status} 
                    onValueChange={(value) => handleStatusChange(value as StatusType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Issue Type</h4>
                  <p className="text-sm">{issueTypeLabels[selectedIssue.type]}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Engagement</h4>
                  <div className="flex space-x-4 text-sm">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{selectedIssue.upvotes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{selectedIssue.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <CommentList 
                issueId={selectedIssue.id} 
                comments={selectedIssue.comments} 
                isAdmin={true}
              />
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/issues/${selectedIssue.id}`)}
              >
                View Public Page
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
};

export default AdminDashboard;
