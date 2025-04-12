
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import IssueList from '@/components/issues/IssueList';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="py-6 md:py-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Community Issues</h1>
              <p className="text-gray-600 mt-1">
                Explore and contribute to making our community better
              </p>
            </div>
            <Button asChild className="bg-civic-blue hover:bg-civic-blue/90">
              <Link to="/report" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Report Issue</span>
              </Link>
            </Button>
          </div>
          
          <IssueList />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
