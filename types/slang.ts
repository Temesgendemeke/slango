interface View {
  id: string;
  post_id: string;
  ip: string;
  createdAt: string;
}

interface PostedBy {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Slang {
  id: string;
  name: string;
  examples: string[];
  explanation: string;
  englishPronunciation: string;
  category_id: string;
  view: number;
  user_id: string;
  originator: string;
  language: string;
  country: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  posted_by: PostedBy;
  views: View[];
  _count: {
    views: number;
  };
}

