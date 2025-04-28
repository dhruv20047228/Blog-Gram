import React, { useState, useEffect } from 'react';
import { Link } from '../components/ui/Link';
import Layout from '../components/layout/Layout';
import { mockUsers, mockPosts } from '../data/mockData';
import { User, BlogPost } from '../types';
import Button from '../components/ui/Button';
import BlogCard from '../components/blog/BlogCard';
import { formatNumber } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

interface ProfilePageProps {
  username?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username = 'sarahwriter' }) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch from an API
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      
      // Filter posts by this user
      const posts = mockPosts.filter(post => post.author.id === foundUser.id);
      setUserPosts(posts);
    }
  }, [username]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (user) {
      setUser({
        ...user,
        followers: isFollowing ? user.followers - 1 : user.followers + 1
      });
    }
  };

  const handleLike = (postId: string) => {
    setUserPosts(userPosts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } 
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setUserPosts(userPosts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked } 
        : post
    ));
  };

  const isOwnProfile = currentUser?.id === user?.id;

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-slate-500">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="bg-slate-800 h-32"></div>
          <div className="px-6 sm:px-8 relative">
            <div className="flex flex-col sm:flex-row">
              <div className="-mt-16 flex justify-center sm:justify-start">
                <img
                  src={user.profileImage}
                  alt={user.displayName}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="flex-1 mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">{user.displayName}</h1>
                    <p className="text-slate-500">@{user.username}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end">
                    {isOwnProfile ? (
                      <Button variant="outline">Edit Profile</Button>
                    ) : (
                      <Button
                        variant={isFollowing ? 'outline' : 'primary'}
                        onClick={handleFollow}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pb-4">
              <p className="text-slate-700 mb-4">{user.bio}</p>
              <div className="flex space-x-6">
                <div>
                  <span className="font-semibold text-slate-900">{formatNumber(userPosts.length)}</span>
                  <span className="text-slate-600 ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">{formatNumber(user.followers)}</span>
                  <span className="text-slate-600 ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">{formatNumber(user.following)}</span>
                  <span className="text-slate-600 ml-1">Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-slate-800 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-slate-800 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              About
            </button>
          </nav>
        </div>
        
        {activeTab === 'posts' && (
          <div>
            {userPosts.length > 0 ? (
              <div className="space-y-6">
                {userPosts.map(post => (
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
                <p className="text-lg text-slate-600">No posts yet.</p>
                {isOwnProfile && (
                  <div className="mt-4">
                    <Link to="/create" variant="button">
                      Write your first blog
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">About {user.displayName}</h2>
            <div className="space-y-4">
              <p className="text-slate-700">{user.bio}</p>
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">Joined</h3>
                <p className="text-slate-600">{new Date(user.joinedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;