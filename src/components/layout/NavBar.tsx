
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, User, BarChart3 } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-civic-blue" />
          <span className="text-xl font-bold text-civic-blue">CivicEye</span>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          <Button
            variant={isActive('/') ? "default" : "ghost"}
            asChild
            className={isActive('/') ? "bg-civic-blue hover:bg-civic-blue/90" : ""}
          >
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Map View</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/issues') ? "default" : "ghost"}
            asChild
            className={isActive('/issues') ? "bg-civic-blue hover:bg-civic-blue/90" : ""}
          >
            <Link to="/issues" className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>All Issues</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/profile') ? "default" : "ghost"}
            asChild
            className={isActive('/profile') ? "bg-civic-blue hover:bg-civic-blue/90" : ""}
          >
            <Link to="/profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/admin') ? "default" : "ghost"}
            asChild
            className={isActive('/admin') ? "bg-civic-blue hover:bg-civic-blue/90" : ""}
          >
            <Link to="/admin" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </Button>
        </div>
        
        <div className="block md:hidden">
          <Button variant="ghost" className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu - simplified for this example */}
      <div className="md:hidden flex justify-around border-t border-gray-200 bg-gray-50">
        <Link to="/" className={`p-3 flex flex-col items-center text-xs ${isActive('/') ? 'text-civic-blue font-medium' : 'text-gray-600'}`}>
          <MapPin className="h-5 w-5 mb-1" />
          <span>Map</span>
        </Link>
        <Link to="/issues" className={`p-3 flex flex-col items-center text-xs ${isActive('/issues') ? 'text-civic-blue font-medium' : 'text-gray-600'}`}>
          <AlertCircle className="h-5 w-5 mb-1" />
          <span>Issues</span>
        </Link>
        <Link to="/profile" className={`p-3 flex flex-col items-center text-xs ${isActive('/profile') ? 'text-civic-blue font-medium' : 'text-gray-600'}`}>
          <User className="h-5 w-5 mb-1" />
          <span>Profile</span>
        </Link>
        <Link to="/admin" className={`p-3 flex flex-col items-center text-xs ${isActive('/admin') ? 'text-civic-blue font-medium' : 'text-gray-600'}`}>
          <BarChart3 className="h-5 w-5 mb-1" />
          <span>Admin</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
