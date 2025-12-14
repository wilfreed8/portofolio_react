export interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  techs: string[];
  repoUrl: string;
  liveUrl: string;
  images: string[];
  problem: string;
  solution: string;
  results: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'tools';
}

export interface Experience {
  id: number;
  type: 'work' | 'education';
  date: string;
  title: string;
  organization: string;
  description: string;
  image?: string ;
}

export type Theme = 'light' | 'dark';