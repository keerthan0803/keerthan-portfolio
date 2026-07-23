export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "3d" | "fullstack" | "ai" | "mobile";
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface FeedbackItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
