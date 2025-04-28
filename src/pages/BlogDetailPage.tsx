import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Bookmark, Share2, ChevronLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Link } from '../components/ui/Link';
import { mockPosts, mockComments } from '../data/mockData';
import { formatDate } from '../utils/helpers';
import { BlogPost, Comment } from '../types';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

interface BlogDetailPageProps {
  blogId?: string;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ blogId = '1' }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch from an API
    const foundPost = mockPosts.find(p => p.id === blogId);
    if (foundPost) {
      setPost(foundPost);
      setLiked(foundPost.isLiked);
      setBookmarked(foundPost.isBookmarked);
      setLikesCount(foundPost.likes);
      
      const postComments = mockComments[blogId] || [];
      setComments(postComments);
    }
  }, [blogId]);

  const handleLike = () => {
    if (!isAuthenticated) return;
    
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    if (!isAuthenticated) return;
    
    setBookmarked(!bookmarked);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        content: newComment,
        author: currentUser,
        publishedAt: new Date().toISOString(),
        likes: 0,
        isLiked: false
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  if (!post) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-slate-500">Loading blog post...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <Link to="/" className="flex items-center text-slate-600 hover:text-slate-900 mb-6">
          <ChevronLeft size={20} />
          <span className="ml-1">Back to feed</span>
        </Link>
        
        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden h-64 md:h-96">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center mb-6">
            <Link to={`/profile/${post.author.username}`} className="flex items-center">
              <img 
                src={post.author.profileImage} 
                alt={post.author.displayName} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-slate-900">{post.author.displayName}</h3>
                <div className="flex items-center text-sm text-slate-500">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="prose prose-slate max-w-none mb-8">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 border-t border-b border-gray-200 py-4 my-8">
            <button 
              onClick={handleLike} 
              className={`flex items-center ${liked ? 'text-red-500' : 'text-slate-500'} hover:text-red-500 transition-colors`}
              disabled={!isAuthenticated}
            >
              <Heart size={24} className={liked ? 'fill-current' : ''} />
              <span className="ml-2 font-medium">{likesCount}</span>
            </button>
            
            <a href="#comments" className="flex items-center text-slate-500 hover:text-slate-700 transition-colors">
              <MessageSquare size={24} />
              <span className="ml-2 font-medium">{comments.length}</span>
            </a>
            
            <button 
              onClick={handleBookmark} 
              className={`flex items-center ${bookmarked ? 'text-emerald-500' : 'text-slate-500'} hover:text-emerald-500 transition-colors`}
              disabled={!isAuthenticated}
            >
              <Bookmark size={24} className={bookmarked ? 'fill-current' : ''} />
              <span className="ml-2 font-medium">{bookmarked ? 'Saved' : 'Save'}</span>
            </button>
            
            <button className="flex items-center ml-auto text-slate-500 hover:text-slate-700 transition-colors">
              <Share2 size={24} />
              <span className="ml-2 font-medium">Share</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 my-6">
            {post.tags.map((tag, index) => (
              <Link 
                key={index}
                to={`/tag/${tag}`}
                className="bg-slate-100 text-slate-800 rounded-full px-3 py-1 text-sm hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        
        <div id="comments" className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Comments ({comments.length})</h2>
          
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>
              <Button 
                type="submit" 
                variant="primary" 
                isLoading={isSubmitting}
                disabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </form>
          ) : (
            <div className="bg-slate-50 p-4 rounded-lg mb-8 text-center">
              <p className="text-slate-700 mb-3">Sign in to join the conversation</p>
              <div className="flex justify-center space-x-4">
                <Link to="/login" variant="button" className="px-4 py-2">
                  Log in
                </Link>
                <Link to="/signup" variant="button" className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2">
                  Sign up
                </Link>
              </div>
            </div>
          )}
          
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-start mb-2">
                    <Link to={`/profile/${comment.author.username}`} className="flex-shrink-0">
                      <img 
                        src={comment.author.profileImage} 
                        alt={comment.author.displayName} 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <Link to={`/profile/${comment.author.username}`} className="font-medium text-slate-900 mr-2">
                          {comment.author.displayName}
                        </Link>
                        <span className="text-xs text-slate-500">{formatDate(comment.publishedAt)}</span>
                      </div>
                      <p className="text-slate-700">{comment.content}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <button className="text-slate-500 hover:text-slate-700 mr-4">
                          <span>Like{comment.likes > 0 ? ` (${comment.likes})` : ''}</span>
                        </button>
                        <button className="text-slate-500 hover:text-slate-700">
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600">No comments yet.</p>
              <p className="text-slate-500 mt-1">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetailPage;