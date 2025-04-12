
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-6xl font-bold text-civic-blue mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-civic-blue hover:bg-civic-blue/90"
        >
          Return to Home
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
