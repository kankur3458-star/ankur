
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ArrowRight, Heart, Star, LayoutGrid, ChevronRight, Check, CalendarRange, Sparkles, XCircle, X, Zap, Droplet, Wind, Bug, Leaf, Scissors, ChevronLeft } from 'lucide-react';
import { ServiceItem } from '../types';

interface Props {
  onSelectCarpenter: () => void;
  onSelectElectrician: () => void;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onViewService?: (service: ServiceItem) => void;
}

const CATEGORIES = [
  { id: '1', name: 'Cleaning', icon: '🧹', color: 'bg-orange-50 text-orange-500' },
  { id: '2', name: 'Repair', icon: '💼', color: 'bg-orange-100 text-orange-600' },
  { id: '3', name: 'Painting', icon: '🎨', color: 'bg-purple-50 text-purple-500' },
  { id: '4', name: 'Moving', icon: '🚚', color: 'bg-green-50 text-green-500' },
];

const ALL_CATEGORIES = [
  ...CATEGORIES,
  { id: '5', name: 'Electrician', icon: <Zap size={24} />, color: 'bg-blue-50 text-blue-500' },
  { id: '6', name: 'Plumber', icon: <Droplet size={24} />, color: 'bg-cyan-50 text-cyan-500' },
  { id: '7', name: 'AC Service', icon: <Wind size={24} />, color: 'bg-indigo-50 text-indigo-500' },
  { id: '8', name: 'Pest Control', icon: <Bug size={24} />, color: 'bg-red-50 text-red-500' },
  { id: '9', name: 'Gardening', icon: <Leaf size={24} />, color: 'bg-emerald-50 text-emerald-500' },
  { id: '10', name: 'Salon', icon: <Scissors size={24} />, color: 'bg-rose-50 text-rose-500' },
];

const FEATURED_SLIDES = [
  {
    id: 'f1',
    title: 'AC Deep Cleaning',
    subtitle: 'Flat 20% OFF',
    tag: 'Summer Deal',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7bc3?auto=format&fit=crop&q=80&w=800',
    color: 'from-blue-600 to-indigo-600',
    actionQuery: 'AC Service'
  },
  {
    id: 'f2',
    title: 'Sofa Spa & Revive',
    subtitle: 'Hygienic Deep Clean',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
    color: 'from-orange-500 to-rose-500',
    actionQuery: 'Cleaning'
  },
  {
    id: 'f3',
    title: 'Full Home Painting',
    subtitle: 'Free Color Consult',
    tag: 'New Launch',
    image: 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&q=80&w=800',
    color: 'from-purple-600 to-pink-600',
    actionQuery: 'Painting'
  }
];

const POPULAR_SERVICES: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Carpenter', 
    duration: 'TBD', 
    startingPrice: 499, 
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400', 
    categoryIcon: 'hammer',
    description: 'Elite carpentry solutions including furniture repair, custom assembly, and structural woodworking by certified masters.',
    benefits: ['Certified Specialists', 'Eco-friendly Materials', 'Dust-free Workspace', 'Quality Assurance'],
    rating: 4.8,
    reviewsCount: '3.4k'
  },
  { 
    id: 'elec_1', 
    title: 'Electrician', 
    duration: 'TBD', 
    startingPrice: 299, 
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400', 
    categoryIcon: 'zap',
    description: 'Comprehensive electrical diagnostics and installation. Safe, professional, and compliant with all modern safety standards.',
    benefits: ['Insured Work', 'Emergency Fault-finding', 'Safety Equipment', 'Transparent Pricing'],
    rating: 4.9,
    reviewsCount: '2.8k'
  },
  { 
    id: 'plum_1', 
    title: 'Plumber', 
    duration: 'TBD', 
    startingPrice: 349, 
    imageUrl: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&q=80&w=400', 
    categoryIcon: 'droplet',
    description: 'Expert plumbing from leak repair to full system overhauls. We ensure your pipes and fixtures work perfectly without hassle.',
    benefits: ['24/7 Availability', 'Advanced Leak Detection', 'Non-invasive Repair', 'Genuine Spare Parts'],
    rating: 4.7,
    reviewsCount: '1.9k'
  },
  { 
    id: 'clean_1', 
    title: 'Cleaning', 
    duration: 'TBD', 
    startingPrice: 599, 
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=400', 
    categoryIcon: 'brush',
    description: 'Deep cleaning services using hospital-grade disinfectants. We make your space spotless, healthy, and refreshing.',
    benefits: ['Safe Disinfectants', 'Trained Personnel', 'Eco-friendly cleaning', 'Customizable Schedule'],
    rating: 4.8,
    reviewsCount: '5.2k'
  }
];

const LandingHome: React.FC<Props> = ({ onSelectCarpenter, onSelectElectrician, favorites = [], onToggleFavorite, onViewService }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideTimer = useRef<any>(null);

  useEffect(() => {
    if (searchQuery) return;
    
    slideTimer.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % FEATURED_SLIDES.length);
    }, 4500);

    return () => {
      if (slideTimer.current) clearInterval(slideTimer.current);
    };
  }, [searchQuery]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectCategory = (name: string) => {
    if (name === 'Electrician') {
      onSelectElectrician();
    } else if (name === 'Carpenter') {
      onSelectCarpenter();
    } else {
      setSearchQuery(name);
    }
    setShowAllCategories(false);
  };

  const handleSliderAction = (query: string) => {
    setSearchQuery(query);
    window.scrollTo({ top: 450, behavior: 'smooth' });
  };

  const nextSlide = () => setActiveSlide(prev => (prev + 1) % FEATURED_SLIDES.length);
  const prevSlide = () => setActiveSlide(prev => (prev - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return POPULAR_SERVICES;
    const lowerQuery = searchQuery.toLowerCase();
    return POPULAR_SERVICES.filter(service => 
      service.title.toLowerCase().includes(lowerQuery) || 
      service.description?.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const handleSearchAction = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    if (query.includes('carpenter') || query.includes('wood') || query.includes('furniture')) {
      onSelectCarpenter();
    } else if (query.includes('electrician') || query.includes('wire') || query.includes('light') || query.includes('socket')) {
      onSelectElectrician();
    } else {
      const match = POPULAR_SERVICES.find(s => s.title.toLowerCase().includes(query));
      if (match) onViewService?.(match);
    }
  };

  return (
    <div className="pt-20 px-6 pb-32 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-black text-slate-900 leading-tight">
          Hello, <span className="text-orange-500">Master</span> <br />
          Find your service.
        </h2>
      </div>

      <form onSubmit={handleSearchAction} className="relative mb-8 group">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${searchQuery ? 'text-orange-500' : 'text-slate-400'}`}>
          <Search size={20} className={searchQuery ? 'animate-pulse' : ''} />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for AC repair, painting..."
          className="w-full bg-white border border-slate-100 h-14 pl-12 pr-14 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 text-sm transition-all placeholder:text-slate-300 font-medium text-slate-900"
        />
        {searchQuery && (
          <button 
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
          >
            <XCircle size={18} />
          </button>
        )}
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2.5 rounded-full shadow-md shadow-orange-100 active:scale-90 transition-all hover:bg-slate-900"
        >
          <ArrowRight size={20} />
        </button>
      </form>

      {!searchQuery && (
        <>
          <div className="relative mb-10 h-56 group">
            <div className="w-full h-full relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-orange-100">
              {FEATURED_SLIDES.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === activeSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
                  }`}
                >
                  <img src={slide.image} className="w-full h-full object-cover" alt="" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80 mix-blend-multiply`}></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{slide.tag}</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight leading-tight mb-1">{slide.title}</h3>
                    <p className="text-white/80 font-bold text-sm mb-6">{slide.subtitle}</p>
                    <button 
                      onClick={() => handleSliderAction(slide.actionQuery)}
                      className="w-fit bg-white text-slate-900 px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all hover:bg-slate-900 hover:text-white"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {FEATURED_SLIDES.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${activeSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Browse Categories</h3>
            <button 
              onClick={() => setShowAllCategories(true)}
              className="text-orange-500 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 group"
            >
              All Categories <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex gap-4 mb-10 overflow-x-auto hide-scrollbar pb-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => selectCategory(cat.name)}
                className="flex flex-col items-center gap-3 group min-w-[80px]"
              >
                <div className={`w-16 h-16 ${cat.color} rounded-[2rem] flex items-center justify-center text-2xl shadow-sm border border-transparent group-active:scale-95 group-hover:border-white transition-all`}>
                  {cat.icon}
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{cat.name}</span>
              </button>
            ))}
            <button 
              onClick={() => setShowAllCategories(true)}
              className="flex flex-col items-center gap-3 group min-w-[80px]"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm group-active:scale-95 transition-all">
                <LayoutGrid size={24} />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">More</span>
            </button>
          </div>
        </>
      )}

      <div className="flex justify-between items-end mb-6 px-1">
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
          {searchQuery ? `Results for "${searchQuery}"` : 'Most Booked'}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        {filteredServices.map(service => {
          const isFav = favorites.includes(service.id);
          const isExpanded = expandedIds.includes(service.id);
          
          return (
            <div key={service.id} className={`bg-white border border-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 group relative ${isExpanded ? 'col-span-2' : 'col-span-1'}`}>
              <div className={`${isExpanded ? 'h-56' : 'h-32'} relative overflow-hidden transition-all duration-500`}>
                <img src={service.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(service.id); }}
                  className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-md transition-all active:scale-75 z-10 ${
                    isFav ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-white/80 text-slate-300 hover:text-rose-500'
                  }`}
                >
                  <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
                </button>

                {isExpanded && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                     <div className="flex items-center gap-2">
                       <div className="bg-orange-500 p-1.5 rounded-lg">
                          <Sparkles size={12} className="text-white" />
                       </div>
                       <span className="text-white text-[10px] font-black uppercase tracking-widest">Master Selection</span>
                     </div>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-black text-slate-900 tracking-tight transition-all uppercase ${isExpanded ? 'text-xl' : 'text-sm'}`}>{service.title}</h4>
                  {isExpanded && (
                    <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-xl border border-orange-100 flex-shrink-0">
                      <Star size={12} fill="#f97316" className="text-orange-500" />
                      <span className="text-[11px] font-black text-orange-700">{service.rating}</span>
                    </div>
                  )}
                </div>

                <p className={`text-slate-500 leading-relaxed font-medium transition-all duration-300 ${isExpanded ? 'text-sm mb-6 opacity-100' : 'text-[10px] line-clamp-2 h-7 mb-2 opacity-80 uppercase tracking-tighter'}`}>
                  {service.description}
                </p>

                {isExpanded && (
                  <div className="grid grid-cols-2 gap-3 mb-8 animate-in slide-in-from-top-2 duration-300">
                    {service.benefits?.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="bg-white p-1 rounded-full shadow-sm">
                          <Check size={12} className="text-green-500 flex-shrink-0" />
                        </div>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {!isExpanded && (
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex flex-col">
                       <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Starts @</span>
                       <span className="text-base font-black text-slate-900 tracking-tighter">₹ {service.startingPrice}</span>
                    </div>
                    <button 
                      onClick={(e) => toggleExpand(service.id, e)}
                      className="text-[10px] text-orange-500 font-black uppercase tracking-widest py-1 flex items-center gap-1 group"
                    >
                      Details <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                {isExpanded && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center justify-between px-2">
                       <div className="flex flex-col">
                         <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Estimated Price</span>
                         <span className="text-2xl font-black text-slate-900 tracking-tighter">₹ {service.startingPrice}</span>
                       </div>
                       <button 
                        onClick={() => onViewService?.(service)}
                        className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-slate-900 transition-colors border-b border-transparent hover:border-slate-300"
                      >
                        Deep Details
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <button 
                        onClick={() => {
                          if (service.id === '1' || service.title.toLowerCase().includes('carpenter')) {
                            onSelectCarpenter();
                          } else if (service.id === 'elec_1' || service.title.toLowerCase().includes('electrician')) {
                            onSelectElectrician();
                          } else {
                            onViewService?.(service);
                          }
                        }}
                        className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.15em] shadow-xl hover:bg-orange-500 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                      >
                        Reserve Service Now <CalendarRange size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <button 
                        onClick={(e) => toggleExpand(service.id, e)}
                        className="w-full bg-slate-50 text-slate-400 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 hover:text-slate-600 transition-all"
                      >
                        Minimize View
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAllCategories && (
        <div className="fixed inset-0 z-[200] bg-white animate-in slide-in-from-bottom duration-500 flex flex-col">
          <div className="px-8 pt-10 pb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Explore</h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">All Service Verticals</p>
            </div>
            <button 
              onClick={() => setShowAllCategories(false)}
              className="p-4 bg-slate-50 rounded-full text-slate-400 active:scale-90 transition-all"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-8 pb-10">
            <div className="grid grid-cols-2 gap-4">
              {ALL_CATEGORIES.map((cat, idx) => (
                <button 
                  key={cat.id}
                  onClick={() => selectCategory(cat.name)}
                  className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all group animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className={`w-16 h-16 ${cat.color} rounded-[2rem] flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-black text-slate-700 uppercase tracking-widest text-center group-hover:text-orange-500 transition-colors">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-8 border-t border-slate-50 flex items-center justify-center">
             <div className="flex items-center gap-2 opacity-30">
               <Sparkles size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Opebo Curated Selection</span>
             </div>
          </div>
        </div>
      )}

      {filteredServices.length === 0 && (
        <div className="text-center py-20 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">No results for "{searchQuery}"</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Try searching for "Carpenter" or "Repair"</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingHome;
