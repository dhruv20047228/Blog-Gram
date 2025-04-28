import React from 'react';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  // In a real app, we would use a router to handle navigation
  // For the demo, we'll show the HomePage by default
  
  const path = window.location.pathname;
  
  return (
    <AuthProvider>
      {path === '/' && <HomePage />}
      {path === '/login' && <LoginPage />}
      {path.startsWith('/blog/') && <BlogDetailPage blogId={path.split('/')[2]} />}
      {path.startsWith('/profile/') && <ProfilePage username={path.split('/')[2]} />}
      {path !== '/' && path !== '/login' && !path.startsWith('/blog/') && !path.startsWith('/profile/') && <HomePage />}
    </AuthProvider>
  );
}

export default App;