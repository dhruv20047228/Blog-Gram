import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:block md:w-64 lg:w-72 shrink-0">
              <div className="sticky top-20">
                <Sidebar />
              </div>
            </div>
            <main className="flex-1 min-w-0 md:pl-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;