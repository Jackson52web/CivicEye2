
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIssues } from '@/contexts/IssueContext';
import IssueCard from '@/components/issues/IssueCard';

const Profile = () => {
  const { issues } = useIssues();
  
  // For demo purposes, filter issues as if they were the user's
  const userIssues = issues.filter((_, index) => index % 2 === 0);
  const pendingIssues = userIssues.filter(issue => issue.status === 'pending');
  const inProgressIssues = userIssues.filter(issue => issue.status === 'inProgress');
  const resolvedIssues = userIssues.filter(issue => issue.status === 'resolved');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-xl bg-civic-blue text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4">John Doe</CardTitle>
                  <CardDescription>Member since April 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p>john.doe@example.com</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Neighborhood</h3>
                      <p>Downtown</p>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Issues Reported</span>
                      <span className="font-medium">{userIssues.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Resolved Issues</span>
                      <span className="font-medium">{resolvedIssues.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Comments Made</span>
                      <span className="font-medium">
                        {userIssues.reduce((sum, issue) => sum + issue.comments.filter(c => c.isAdmin === false).length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Upvotes Given</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">My Issues</h2>
              
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All ({userIssues.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({pendingIssues.length})</TabsTrigger>
                  <TabsTrigger value="inProgress">In Progress ({inProgressIssues.length})</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved ({resolvedIssues.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {userIssues.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <p className="text-gray-500">You haven't reported any issues yet.</p>
                        <Button className="mt-4 bg-civic-blue hover:bg-civic-blue/90">
                          Report an Issue
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    userIssues.map(issue => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="pending" className="space-y-4">
                  {pendingIssues.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <p className="text-gray-500">You have no pending issues.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    pendingIssues.map(issue => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="inProgress" className="space-y-4">
                  {inProgressIssues.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <p className="text-gray-500">You have no issues in progress.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    inProgressIssues.map(issue => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="resolved" className="space-y-4">
                  {resolvedIssues.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <p className="text-gray-500">You have no resolved issues.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    resolvedIssues.map(issue => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
