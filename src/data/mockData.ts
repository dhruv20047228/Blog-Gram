import { BlogPost, User, Comment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'sarahwriter',
    displayName: 'Sarah Johnson',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    bio: 'Tech enthusiast | Fiction writer | Coffee lover',
    followers: 2354,
    following: 156,
    joinedDate: '2023-03-15'
  },
  {
    id: '2',
    username: 'markpen',
    displayName: 'Mark Williams',
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    bio: 'Travel blogger | Photographer | Adventure seeker',
    followers: 5678,
    following: 234,
    joinedDate: '2022-11-08'
  },
  {
    id: '3',
    username: 'techamy',
    displayName: 'Amy Chen',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    bio: 'Software engineer | AI enthusiast | Book lover',
    followers: 1287,
    following: 342,
    joinedDate: '2023-01-22'
  },
  {
    id: '4',
    username: 'foodieking',
    displayName: 'James Peterson',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Food critic | Chef | Restaurant explorer',
    followers: 8976,
    following: 456,
    joinedDate: '2022-09-30'
  }
];

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in Everyday Life',
    excerpt: 'How AI is transforming our daily routines and what to expect in the coming years.',
    content: `Artificial Intelligence has become an integral part of our lives in ways we might not even realize. From the moment we wake up to check our personalized news feeds to asking our smart assistants about the weather, AI algorithms are working behind the scenes to make our lives more convenient.

In the coming years, we can expect AI to become even more seamlessly integrated into our daily routines. Smart homes will anticipate our needs before we even articulate them, healthcare will become more personalized through AI analysis of our health data, and education will be tailored to individual learning styles through intelligent tutoring systems.

However, as AI becomes more ubiquitous, we must also address the ethical implications and ensure that these technologies are developed responsibly. Privacy concerns, algorithmic bias, and the digital divide are all challenges that need careful consideration as we move forward in this AI-driven future.

What are your thoughts on AI's growing role in our lives? Are you excited about the possibilities, or concerned about potential pitfalls? Let me know in the comments!`,
    coverImage: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
    author: mockUsers[0],
    publishedAt: '2023-11-15T09:30:00Z',
    likes: 243,
    comments: 57,
    tags: ['technology', 'AI', 'future'],
    isLiked: false,
    isBookmarked: true,
    readTime: 4
  },
  {
    id: '2',
    title: 'Exploring the Hidden Gems of Portugal',
    excerpt: 'Venture beyond Lisbon and Porto to discover Portugal\'s lesser-known treasures.',
    content: `While Lisbon and Porto rightfully attract millions of tourists each year, Portugal's true charm often lies in its lesser-known destinations. After spending three weeks exploring this beautiful country, I discovered some hidden gems that deserve a spot on any traveler's itinerary.

Óbidos, a medieval walled town just an hour north of Lisbon, feels like stepping back in time. Its narrow cobblestone streets are lined with whitewashed houses adorned with vibrant flowers. Don't miss trying ginjinha, a sour cherry liqueur often served in chocolate cups.

Further north, the Douro Valley offers breathtaking landscapes of terraced vineyards cascading down to the Douro River. While famous for its port wine, the region also produces excellent table wines and provides opportunities for river cruises and hiking.

For beach lovers seeking solitude, Costa Vicentina in the southwestern Alentejo region boasts dramatic cliffs and pristine beaches without the crowds of the Algarve. The fishing village of Zambujeira do Mar offers the perfect base for exploring this unspoiled coastline.

What hidden gems have you discovered in your travels? Share your own secret spots in the comments!`,
    coverImage: 'https://images.pexels.com/photos/2537607/pexels-photo-2537607.jpeg',
    author: mockUsers[1],
    publishedAt: '2023-10-22T15:45:00Z',
    likes: 678,
    comments: 89,
    tags: ['travel', 'Portugal', 'hidden gems'],
    isLiked: true,
    isBookmarked: false,
    readTime: 5
  },
  {
    id: '3',
    title: 'Why Functional Programming Matters in 2023',
    excerpt: 'The resurgence of functional programming principles in modern software development.',
    content: `In recent years, functional programming has experienced a renaissance in the software development world. Languages like Haskell, Clojure, and Elixir have gained popularity, while mainstream languages such as JavaScript, Python, and Java have incorporated functional programming features.

What's driving this shift? As applications become more complex and distributed, the benefits of functional programming—immutability, pure functions, and declarative code—have become increasingly valuable. These principles make code more predictable, testable, and easier to reason about, especially in concurrent and parallel computing environments.

Immutability, a cornerstone of functional programming, eliminates an entire class of bugs related to state mutations. By treating data as immutable, we can avoid race conditions and make our code more thread-safe. Higher-order functions and function composition allow for more elegant and reusable code, reducing duplication and improving maintainability.

Functional programming also aligns well with modern architectural patterns like microservices and event-driven systems. The emphasis on pure functions and immutability makes it easier to build systems that are resilient, scalable, and responsive.

Are you incorporating functional programming principles in your work? What benefits or challenges have you encountered? Let's discuss in the comments!`,
    coverImage: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    author: mockUsers[2],
    publishedAt: '2023-11-05T11:15:00Z',
    likes: 421,
    comments: 73,
    tags: ['programming', 'functional programming', 'software development'],
    isLiked: false,
    isBookmarked: false,
    readTime: 6
  },
  {
    id: '4',
    title: 'The Art of Sourdough: Mastering the Perfect Loaf',
    excerpt: 'A journey into sourdough bread making and the science behind the perfect crust.',
    content: `My sourdough journey began during the lockdowns of 2020, like many others who turned to bread baking as a form of culinary therapy. What started as a simple curiosity has become a passionate hobby, with each loaf teaching me something new about the fascinating intersection of art and science that is sourdough bread.

The heart of sourdough is the starter—a living culture of wild yeasts and beneficial bacteria. Creating and maintaining a healthy starter requires attention and care, but the reward is a leavening agent that not only raises your bread but also develops complex flavors impossible to achieve with commercial yeast.

The key to a great sourdough loaf lies in understanding fermentation. Temperature, time, hydration, and flour type all influence how your dough develops. I've found that a long, cold fermentation in the refrigerator (12-18 hours) produces the most flavorful bread with a complex, slightly tangy profile.

Equally important is the baking environment. The steam created in the first part of baking allows the bread to expand fully before the crust sets, resulting in that coveted open crumb structure. A Dutch oven is the home baker's best friend for creating this crucial steam environment.

Are you on your own sourdough journey? Share your experiences, challenges, or questions in the comments below!`,
    coverImage: 'https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg',
    author: mockUsers[3],
    publishedAt: '2023-10-30T08:20:00Z',
    likes: 892,
    comments: 134,
    tags: ['cooking', 'baking', 'sourdough', 'food'],
    isLiked: true,
    isBookmarked: true,
    readTime: 5
  }
];

export const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: '101',
      content: 'This is a fascinating perspective on AI. I particularly agree with your points about ethical implications.',
      author: mockUsers[1],
      publishedAt: '2023-11-15T10:45:00Z',
      likes: 12,
      isLiked: false
    },
    {
      id: '102',
      content: 'Great article! I work in AI research and you\'ve captured many of the exciting possibilities and challenges we\'re facing.',
      author: mockUsers[2],
      publishedAt: '2023-11-15T14:22:00Z',
      likes: 8,
      isLiked: true
    }
  ],
  '2': [
    {
      id: '201',
      content: 'I visited Óbidos last summer and it was just as magical as you described! Would add Sintra to this list too.',
      author: mockUsers[0],
      publishedAt: '2023-10-22T18:30:00Z',
      likes: 15,
      isLiked: true
    },
    {
      id: '202',
      content: 'Your photos are stunning! Adding the Douro Valley to my travel bucket list for sure.',
      author: mockUsers[3],
      publishedAt: '2023-10-23T09:15:00Z',
      likes: 7,
      isLiked: false
    }
  ]
};