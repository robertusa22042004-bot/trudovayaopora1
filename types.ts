export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  SERVICE_DETAIL = 'service_detail',
  PRICING = 'pricing',
  JOBS = 'jobs',
  CONTACT = 'contact',
  APPLICATION = 'application'
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  icon: string;
  priceRange: string;
}

export interface JobPosition {
  id: string;
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}
