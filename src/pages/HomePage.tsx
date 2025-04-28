import React, { useState } from 'react';
import { PenSquare } from 'lucide-react';
import Layout from '../components/layout/Layout';
import BlogCard from '../components/blog/BlogCard';
import { Link } from '../components/ui/Link';
import { mockPosts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } 
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked } 
        : post
    ));
  };

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Your Feed</h1>
        {isAuthenticated && (
          <Link 
            to="/create" 
            variant="button" 
            className="flex items-center bg-emerald-600 hover:bg-emerald-500"
          >
            <PenSquare size={18} className="mr-2" />
            Write a blog
          </Link>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map(post => (
            <BlogCard 
              key={post.id} 
              post={post} 
              onLike={handleLike} 
              onBookmark={handleBookmark} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-slate-600">No posts to show.</p>
          <p className="text-slate-500 mt-2">Follow more users to see their content here.</p>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;