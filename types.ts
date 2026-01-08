
export interface ServiceItem {
  id: string;
  title: string;
  duration: string;
  startingPrice: number;
  imageUrl: string;
  categoryIcon: string;
  description?: string;
  benefits?: string[];
  rating?: number;
  reviewsCount?: string;
}

export interface MainServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface AppState {
  view: 'landing' | 'carpenter' | 'details';
  activeTab: 'home' | 'bookings' | 'services' | 'profile';
}
