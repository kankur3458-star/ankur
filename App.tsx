
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import BottomNav from './components/BottomNav';
import AIConsultant from './components/AIConsultant';
import BookingDetails from './components/BookingDetails';
import LandingHome from './components/LandingHome';
import ServiceDetailModal from './components/ServiceDetailModal';
import ManageAddress from './components/ManageAddress';
import Auth from './components/Auth';
import { ServiceItem } from './types';
import { 
  CheckCircle, 
  ShoppingBag, 
  ArrowRight, 
  X, 
  Trash2, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  Heart, 
  User, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  MoreHorizontal, 
  CreditCard, 
  Gift, 
  HelpCircle,
  Mail,
  Copy,
  Plus,
  Bell,
  Lock,
  MessageCircle,
  Phone,
  Share2,
  ShieldAlert,
  LogIn
} from 'lucide-react';

const CARPENTER_SERVICES: ServiceItem[] = [
  { 
    id: 'c1', 
    title: 'Furniture Repair', 
    duration: '1-2 HRS', 
    startingPrice: 299, 
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800', 
    categoryIcon: 'wrench',
    description: 'Breathe new life into your beloved furniture. Our experts fix wobbles, broken joints, and surface imperfections with surgical precision.',
    benefits: ['Structural Integrity Check', 'Precision Wood Filling', 'Polish & Wax Finish', '6-Month Warranty'],
    rating: 4.8,
    reviewsCount: '1.2k'
  },
  { 
    id: 'c2', 
    title: 'Furniture Installing', 
    duration: 'TBD INSTALLING', 
    startingPrice: 349, 
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800', 
    categoryIcon: 'hammer',
    description: 'From modular kitchens to sophisticated walk-in closets, our precision installation ensures perfect alignment and long-lasting durability.',
    benefits: ['Leveling & Alignment', 'Hidden Fastening', 'Hardware Adjustment', 'Debris Cleanup'],
    rating: 4.9,
    reviewsCount: '850'
  },
];

const ELECTRICIAN_SERVICES: ServiceItem[] = [
  { 
    id: 'e1', 
    title: 'Switch & Socket Repair', 
    duration: '30-35 mins', 
    startingPrice: 199, 
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400', 
    categoryIcon: 'zap' 
  },
  { 
    id: 'e2', 
    title: 'Fan Repair/Installation', 
    duration: '1-2 hrs', 
    startingPrice: 299, 
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=400', 
    categoryIcon: 'zap' 
  },
  { 
    id: 'e3', 
    title: 'Light & Tube Fix', 
    duration: '30 mins', 
    startingPrice: 199, 
    imageUrl: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=400', 
    categoryIcon: 'zap' 
  },
  { 
    id: 'e4', 
    title: 'Wiring & MCB Work', 
    duration: '2-4 hrs', 
    startingPrice: 499, 
    imageUrl: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&q=80&w=400', 
    categoryIcon: 'zap' 
  },
];

const GENERAL_SERVICES: ServiceItem[] = [
  { id: 'plum_1', title: 'Plumber', duration: 'TBD', startingPrice: 349, imageUrl: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&q=80&w=400', categoryIcon: 'droplet' },
  { id: 'clean_1', title: 'Cleaning', duration: 'TBD', startingPrice: 599, imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=400', categoryIcon: 'brush' },
];

const ALL_POSSIBLE_SERVICES = [...CARPENTER_SERVICES, ...ELECTRICIAN_SERVICES, ...GENERAL_SERVICES];

type ViewType = 'landing' | 'carpenter' | 'electrician' | 'details' | 'manage-address' | 'saved-payments' | 'refer-earn' | 'help-support' | 'settings';
type TabType = 'home' | 'bookings' | 'inbox' | 'profile';

const SubviewHeader: React.FC<{ title: string, onBack: () => void }> = ({ title, onBack }) => (
  <div className="fixed top-0 left-0 right-0 bg-white z-[100] px-6 py-4 flex items-center justify-between border-b border-slate-100">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="text-slate-900 active:scale-90 transition-transform p-1">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-lg font-bold text-slate-900">{title}</h1>
    </div>
    <button className="text-slate-900 p-1 active:scale-90 transition-transform"><Bell size={24} /></button>
  </div>
);

const HorizontalServiceCard: React.FC<{ service: ServiceItem, onAdd: (id: string) => void }> = ({ service, onAdd }) => {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd(service.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-4 mb-4 shadow-sm border border-slate-50 flex gap-4 transition-all">
      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
        <img src={service.imageUrl} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="font-bold text-slate-800 text-sm mb-1">{service.title}</h3>
        <p className="text-[10px] text-slate-400 font-bold mb-2">{service.duration}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] text-slate-400 font-bold">Starting at</span>
          <span className="text-base font-black text-slate-900 tracking-tight">₹ {service.startingPrice}</span>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={handleAdd}
          className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase transition-all active:scale-95 shadow-lg ${
            added ? 'bg-green-500 text-white' : 'bg-[#FF4500] text-white shadow-orange-500/20'
          }`}
        >
          {added ? 'Added' : 'Add +'}
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTabState] = useState<TabType>('home');
  const [prevTab, setPrevTab] = useState<TabType | null>(null);
  const [view, setView] = useState<ViewType>('landing');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewingService, setViewingService] = useState<ServiceItem | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toast, setToast] = useState<{title: string, img: string, isService?: boolean} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const setActiveTab = (newTab: TabType) => {
    if (newTab !== activeTab) {
      setPrevTab(activeTab);
      setActiveTabState(newTab);
    }
  };

  const totalPrice = useMemo(() => selectedServices.reduce((acc, curr) => acc + curr.startingPrice, 0), [selectedServices]);
  const hasItems = selectedServices.length > 0;

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const showSystemToast = (message: string, isService = false) => {
    setToast({ 
      title: message, 
      img: isService ? '' : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200',
      isService
    });
  };

  const handleAddService = (id: string) => {
    const service = ALL_POSSIBLE_SERVICES.find(s => s.id === id);
    if (service) {
      setSelectedServices(prev => [...prev, service]);
      setToast({ 
        title: service.title, 
        img: service.imageUrl,
        isService: true 
      });
    }
  };

  const handleRemoveService = (index: number) => {
    const newItems = selectedServices.filter((_, i) => i !== index);
    setSelectedServices(newItems);
    if (newItems.length === 0) {
      setShowSummary(false);
      if (view === 'details') setView('landing');
    }
  };

  const handleProceedToCheckout = () => {
    setShowSummary(false);
    setView('details');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedServices([]);
    setFavorites([]);
    setActiveTabState('home');
    setView('landing');
    setShowProfileMenu(false);
    showSystemToast("Signed out successfully");
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
    showSystemToast("Welcome back, Master!");
  };

  const requireAuth = (action: () => void) => {
    if (isAuthenticated) action(); else setShowAuth(true);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const renderView = () => {
    if (view === 'manage-address') return <ManageAddress onBack={() => setView('landing')} />;
    if (view === 'saved-payments') return <div className="p-10 text-center pt-32"><SubviewHeader title="Payments" onBack={() => setView('landing')} /> Coming Soon</div>;
    if (view === 'refer-earn') return <div className="p-10 text-center pt-32"><SubviewHeader title="Refer & Earn" onBack={() => setView('landing')} /> Coming Soon</div>;
    if (view === 'help-support') return <div className="p-10 text-center pt-32"><SubviewHeader title="Support" onBack={() => setView('landing')} /> Coming Soon</div>;
    if (view === 'settings') return <div className="p-10 text-center pt-32"><SubviewHeader title="Settings" onBack={() => setView('landing')} /> Coming Soon</div>;

    if (activeTab === 'profile') {
      return (
        <div className="bg-white min-h-screen pb-32">
          <div className="fixed top-0 left-0 right-0 bg-white/95 z-[100] px-6 py-4 flex items-center justify-between border-b border-slate-50">
            <button onClick={() => setActiveTab('home')} className="p-1"><ArrowLeft size={24} /></button>
            <h1 className="text-lg font-bold text-slate-900">Profile</h1>
            <button onClick={() => setShowProfileMenu(true)} className="p-1"><MoreHorizontal size={24} /></button>
          </div>
          <div className="pt-24 flex flex-col items-center">
            {!isAuthenticated ? (
              <div className="px-8 text-center mt-6">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 border-2 border-dashed border-slate-200"><User size={48} /></div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Welcome, Guest!</h2>
                <button onClick={() => setShowAuth(true)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all">Sign In</button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-slate-50 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" alt="" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Saurav Singh</h2>
                <p className="text-sm font-bold text-slate-400">+91 23478974</p>
              </div>
            )}
            <div className="w-full px-4 mt-10 space-y-1">
               {[{ id: 'address', label: 'Addresses', icon: <MapPin size={22} className="text-orange-500"/> }, { id: 'bookings_nav', label: 'My Bookings', icon: <ShoppingBag size={22} className="text-orange-500" /> }].map(item => (
                 <button key={item.id} onClick={() => item.id === 'bookings_nav' ? setActiveTab('bookings') : setView('manage-address')} className="w-full flex items-center justify-between py-4 px-2 border-b border-slate-50">
                    <div className="flex items-center gap-4">{item.icon}<span className="text-sm font-bold text-slate-700">{item.label}</span></div>
                    <ChevronRight size={18} className="text-slate-300" />
                 </button>
               ))}
            </div>
            {isAuthenticated && <button onClick={handleLogout} className="mt-10 text-red-500 font-bold text-sm">Sign Out</button>}
          </div>
        </div>
      );
    }

    if (activeTab === 'bookings') return <div className="p-10 text-center pt-32"><SubviewHeader title="My Bookings" onBack={() => setActiveTab('home')} /> {isAuthenticated ? "No active bookings." : "Please login to see bookings."}</div>;
    if (activeTab === 'inbox') return <div className="p-10 text-center pt-32"><SubviewHeader title="Inbox" onBack={() => setActiveTab('home')} /> No messages.</div>;

    if (view === 'electrician') {
      return (
        <div className="bg-slate-50 min-h-screen pb-32 animate-in slide-in-from-right duration-300">
          <SubviewHeader title="Electrician Services" onBack={() => setView('landing')} />
          <div className="pt-20 px-4">
            {/* Electrician Hero Section accurately matching screenshot */}
            <div className="bg-[#FFDFBA]/40 rounded-[2.5rem] p-6 mb-6 flex items-center gap-4 relative overflow-hidden border border-[#FFDFBA]">
               <div className="w-32 h-32 flex-shrink-0 relative z-10 flex items-center justify-center">
                 <img src="https://cdni.iconscout.com/illustration/premium/thumb/electrician-working-on-electricity-5683713-4729094.png" className="w-full h-full object-contain" alt="Professional Electrician" />
               </div>
               <div className="flex-1 relative z-10">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Electrician <span className="font-normal text-slate-600">Services</span></h2>
                  <p className="text-[10px] text-slate-500 font-bold mb-3">Skilled professional for home & office.</p>
                  <div className="flex gap-2 mb-3">
                    <div className="bg-white/90 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-slate-100">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle size={10} strokeWidth={3} /></div>
                      <span className="text-[9px] font-black uppercase tracking-tight text-slate-700">Verified</span>
                    </div>
                    <div className="bg-white/90 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-slate-100">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle size={10} strokeWidth={3} /></div>
                      <span className="text-[9px] font-black uppercase tracking-tight text-slate-700">Local</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-orange-500 gap-0.5">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span className="text-xs font-black text-slate-800">4.4</span>
                    <span className="text-[10px] text-slate-400 font-bold ml-1">9700+ jobs</span>
                  </div>
               </div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>
            </div>

            {/* Verified Electrician Pill from Screenshot */}
            <div className="inline-flex items-center gap-2 mb-6 ml-1 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm">
               <div className="bg-green-500 rounded-full p-0.5"><CheckCircle size={12} className="text-white" strokeWidth={3} /></div>
               <span className="text-xs font-bold text-slate-800">Verified Electrician</span>
            </div>

            <div className="space-y-4">
               {ELECTRICIAN_SERVICES.map(s => (
                 <HorizontalServiceCard key={s.id} service={s} onAdd={handleAddService} />
               ))}
            </div>
          </div>
        </div>
      );
    }

    if (view === 'carpenter') {
      return (
        <div className="pt-24 px-4 pb-48 animate-in fade-in slide-in-from-right duration-500">
          <button onClick={() => setView('landing')} className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </button>
          <Hero favorites={favorites} onToggleFavorite={() => toggleFavorite('category_carpenter')} />
          {CARPENTER_SERVICES.map(s => (
            <ServiceCard 
              key={s.id} 
              service={s} 
              onAdd={handleAddService} 
              isFavorite={favorites.includes(s.id)} 
              onToggleFavorite={() => toggleFavorite(s.id)}
              onViewDetails={() => setViewingService(s)}
            />
          ))}
        </div>
      );
    }

    if (view === 'details') {
      return (
        <BookingDetails 
          services={selectedServices} 
          onBack={() => setView('landing')} 
          onRemove={handleRemoveService}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          requireAuth={requireAuth}
          isAuthenticated={isAuthenticated}
        />
      );
    }

    return (
      <LandingHome 
        onSelectCarpenter={() => setView('carpenter')} 
        onSelectElectrician={() => setView('electrician')}
        favorites={favorites} 
        onToggleFavorite={toggleFavorite} 
        onViewService={setViewingService} 
      />
    );
  };

  return (
    <div className={`max-w-md mx-auto bg-white min-h-screen relative overflow-x-hidden transition-all ${hasItems && !['details', 'electrician'].includes(view) ? 'pb-24' : ''}`}>
      {!['details', 'electrician', 'profile', 'bookings', 'inbox', 'manage-address'].includes(activeTab) && !['electrician'].includes(view) && (
        <Header 
          onNavigate={(tab) => { setActiveTab(tab); if (tab === 'home') setView('landing'); }} 
          onSetView={setView} 
          isAuthenticated={isAuthenticated}
        />
      )}
      
      {renderView()}

      {view !== 'details' && (
        <>
          <AIConsultant bottomOffset={hasItems ? 11 : 5.5} />
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}

      {hasItems && view !== 'details' && (
        <div className="fixed bottom-24 left-6 right-6 z-40 animate-in slide-in-from-bottom duration-500">
           <button 
             onClick={handleProceedToCheckout} 
             className="w-full bg-slate-900 text-white p-5 rounded-3xl flex items-center justify-between shadow-2xl active:scale-95 transition-all border border-white/5"
           >
             <div className="flex items-center gap-3">
               <div className="bg-[#FF4500] p-2 rounded-xl shadow-lg shadow-orange-500/20"><ShoppingBag size={18} /></div>
               <span className="text-xl font-black tracking-tight">₹ {totalPrice}</span>
             </div>
             <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
               Review & Pay <ArrowRight size={14} />
             </div>
           </button>
        </div>
      )}

      {showAuth && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm flex items-end">
          <Auth onLoginSuccess={handleLoginSuccess} />
          <button 
            onClick={() => setShowAuth(false)}
            className="absolute top-8 right-8 z-[1001] p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white active:scale-90"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {toast && (
        <div 
          onClick={() => { if (toast.isService) setShowSummary(true); setToast(null); }} 
          className="fixed top-24 left-6 right-6 z-[450] animate-in slide-in-from-top-16 duration-500 cursor-pointer"
        >
          <div className="bg-slate-900/95 backdrop-blur-xl p-4 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent pointer-events-none"></div>
            {toast.img && <img src={toast.img} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-orange-500/30" alt="" />}
            <div className="flex-1">
              <h4 className="text-sm font-black text-white leading-tight">{toast.title}</h4>
            </div>
            <div className={`px-3.5 py-2 rounded-xl text-orange-400 font-black text-[10px] uppercase tracking-wider transition-all ${toast.isService ? 'bg-orange-500/20' : 'bg-slate-800'}`}>
              {toast.isService ? 'VIEW' : 'OK'}
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-orange-500 animate-toast-progress"></div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-100 rounded-full mb-2 z-[80]"></div>
    </div>
  );
};

export default App;
