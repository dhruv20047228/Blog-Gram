import React, { useState } from 'react';
import { Heart, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import { BlogPost } from '../../types';
import { Link } from '../ui/Link';
import { formatDate, truncateText } from '../../utils/helpers';

interface BlogCardProps {
  post: BlogPost;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onLike, onBookmark }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    onLike(post.id);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark(post.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md mb-6">
      {post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center mb-4">
          <Link to={`/profile/${post.author.username}`} className="flex items-center">
            <img 
              src={post.author.profileImage} 
              alt={post.author.displayName} 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h3 className="font-semibold text-slate-900">{post.author.displayName}</h3>
              <p className="text-xs text-slate-500">{formatDate(post.publishedAt)}</p>
            </div>
          </Link>
        </div>
        
        <Link to={`/blog/${post.id}`} className="block mb-2">
          <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-slate-700 transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-600 mb-3">{truncateText(post.excerpt, 120)}</p>
        </Link>
        
        <div className="flex items-center text-sm text-slate-500 mb-4">
          <span>{post.readTime} min read</span>
          <span className="mx-2">•</span>
          <Link to={`/tag/${post.tags[0]}`} className="text-slate-700 hover:underline">
            {post.tags[0]}
          </Link>
          {post.tags.length > 1 && (
            <span className="ml-1">+{post.tags.length - 1}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike} 
              className={`flex items-center ${liked ? 'text-red-500' : 'text-slate-500'} hover:text-red-500 transition-colors`}
            >
              <Heart size={20} className={liked ? 'fill-current' : ''} />
              <span className="ml-1">{likesCount}</span>
            </button>
            
            <Link to={`/blog/${post.id}#comments`} className="flex items-center text-slate-500 hover:text-slate-700 transition-colors">
              <MessageSquare size={20} />
              <span className="ml-1">{post.comments}</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={handleBookmark} 
              className={`${bookmarked ? 'text-emerald-500' : 'text-slate-500'} hover:text-emerald-500 transition-colors`}
            >
              <Bookmark size={20} className={bookmarked ? 'fill-current' : ''} />
            </button>
            
            <button className="text-slate-500 hover:text-slate-700 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;