import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from '../ui/Link';
import { Newspaper, TrendingUp, Hash, Bookmark, Clock, Settings, HelpCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const mainLinks = [
    { icon: <Newspaper size={20} />, label: 'Feed', path: '/' },
    { icon: <TrendingUp size={20} />, label: 'Trending', path: '/trending' },
    { icon: <Hash size={20} />, label: 'Discover', path: '/discover' },
  ];

  const userLinks = [
    { icon: <Bookmark size={20} />, label: 'Bookmarks', path: '/bookmarks' },
    { icon: <Clock size={20} />, label: 'Reading List', path: '/reading-list' },
  ];

  const footerLinks = [
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={20} />, label: 'Help Center', path: '/help' },
  ];

  const topTags = ['technology', 'programming', 'travel', 'food', 'lifestyle'];

  return (
    <aside className="py-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3 px-3">
            Main
          </h3>
          <nav className="space-y-1">
            {mainLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors group"
              >
                <span className="text-slate-500 group-hover:text-slate-700 mr-3">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {isAuthenticated && (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3 px-3">
              Your Content
            </h3>
            <nav className="space-y-1">
              {userLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors group"
                >
                  <span className="text-slate-500 group-hover:text-slate-700 mr-3">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <div>
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3 px-3">
            Trending Tags
          </h3>
          <div className="px-3">
            {topTags.map((tag, index) => (
              <Link
                key={index}
                to={`/tag/${tag}`}
                className="inline-block bg-slate-100 text-slate-800 rounded-full px-3 py-1 text-xs mr-2 mb-2 hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <nav className="space-y-1">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors group"
              >
                <span className="text-slate-500 group-hover:text-slate-700 mr-3">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;