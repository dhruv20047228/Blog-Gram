export interface User {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  bio: string;
  followers: number;
  following: number;
  joinedDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: User;
  publishedAt: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
  readTime: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  publishedAt: string;
  likes: number;
  isLiked: boolean;
}