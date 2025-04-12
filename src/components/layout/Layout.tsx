
import { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16 md:pt-20 pb-16">
        {children}
      </main>
      <footer className="bg-civic-blue text-white p-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} CivicEye - Empowering communities to report and resolve civic issues</p>
      </footer>
    </div>
  );
};

export default Layout;
