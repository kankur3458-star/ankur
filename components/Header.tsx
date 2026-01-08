
import React, { useState, useEffect } from 'react';
import { Bell, Menu, X, User, ShieldCheck, Heart, ClipboardList, Settings, Sparkles, Search, ExternalLink, Loader2, LogIn } from 'lucide-react';
import { getSmartHomeHelp } from '../services/geminiService';

interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'success' | 'info' | 'promo';
}

interface Props {
  onNavigate?: (tab: 'home' | 'bookings' | 'services' | 'profile') => void;
  onSetView?: (view: 'landing' | 'carpenter') => void;
  isAuthenticated?: boolean;
}

const INITIAL_NOTIFS: Notification[] = [
  { id: '1', title: 'Master Carpenter Allocated', desc: 'Arjun S. has been assigned to your area today.', time: '2m ago', type: 'success' },
];

const Header: React.FC<Props> = ({ onNavigate, onSetView, isAuthenticated }) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFS);
  const [isRinging, setIsRinging] = useState(false);
  
  // Smart Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{text: string, sources: any[]} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsRinging(true), 1500);
    const stopTimer = setTimeout(() => setIsRinging(false), 2500);
    return () => { clearTimeout(timer); clearTimeout(stopTimer); };
  }, []);

  const handleSmartSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    const result = await getSmartHomeHelp(searchQuery);
    setSearchResult(result);
    setSearchLoading(false);
  };

  const menuItems = [
    { id: 'home', icon: <User size={20} />, label: 'My Profile', tab: 'profile' },
    { id: 'bookings', icon: <ClipboardList size={20} />, label: 'Order History', tab: 'bookings' },
    { id: 'saved', icon: <Heart size={20} />, label: 'Saved Services', tab: 'profile' },
    { id: 'partner', icon: <ShieldCheck size={20} />, label: 'Join as Professional', tab: 'home' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-[80] px-6 py-4 flex items-center justify-between border-b border-slate-50">
        <div 
          onClick={() => { onNavigate?.('home'); onSetView?.('landing'); }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
            <div className="w-4 h-4 border-2 border-white rounded-md rotate-45"></div>
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tighter">opebo</h1>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setShowNotifs(true)}
            className={`relative p-2.5 hover:bg-slate-50 rounded-2xl transition-all ${isRinging ? 'animate-bell-ring' : ''}`}
          >
            <Bell size={22} className={`${notifications.length > 0 ? 'text-orange-500' : 'text-slate-600'}`} />
            {notifications.length > 0 && (
              <span className="absolute top-2.5 right-2.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white shadow-[0_0_10px_rgba(239,68,68,0.6)]"></span>
              </span>
            )}
          </button>
          <button 
            onClick={() => setShowMenu(true)}
            className="p-2.5 hover:bg-slate-50 rounded-2xl transition-all"
          >
            <Menu size={24} className="text-slate-800" />
          </button>
        </div>
      </header>

      {/* Notification Drawer */}
      {showNotifs && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowNotifs(false)} />
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 p-8 flex flex-col rounded-l-[3rem]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Updates</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Inbox & Activity</p>
              </div>
              <button onClick={() => setShowNotifs(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {notifications.length > 0 ? (
                notifications.map(n => (
                  <div key={n.id} className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden group hover:bg-white hover:shadow-xl transition-all duration-300">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-[13px] text-slate-800 tracking-tight uppercase">{n.title}</h4>
                      <span className="text-[9px] font-bold text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{n.desc}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-24">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell size={24} className="text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Everything is quiet</p>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setNotifications([])}
              className="mt-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 transition-colors active:scale-95"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Main Menu Drawer */}
      {showMenu && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => setShowMenu(false)} />
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col rounded-l-[3.5rem] overflow-hidden">
            
            {/* Menu Profile Header */}
            <div className="p-10 pb-6 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
               <button onClick={() => setShowMenu(false)} className="absolute top-8 right-8 p-3 text-slate-400 hover:text-slate-900 transition-colors">
                 <X size={20} />
               </button>
               <div className="flex items-center gap-5">
                 <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-orange-100 border-2 border-white ${isAuthenticated ? 'bg-orange-500' : 'bg-slate-200 text-slate-400'}`}>
                   {isAuthenticated ? <User size={32} /> : <LogIn size={32} />}
                 </div>
                 <div>
                   <h3 className="text-xl font-black text-slate-900 tracking-tight">{isAuthenticated ? 'Saurav Singh' : 'Guest User'}</h3>
                   <div className="flex items-center gap-1.5 mt-0.5">
                     <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-300'}`}></div>
                     <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{isAuthenticated ? 'Master Member' : 'Exploring Mode'}</span>
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-6 space-y-10">
              {/* Navigation Section */}
              <div className="space-y-2">
                <h4 className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] mb-4 px-2">Main Menu</h4>
                {menuItems.map((item, idx) => (
                  <button 
                    key={item.id}
                    onClick={() => { onNavigate?.(item.tab as any); setShowMenu(false); }}
                    className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all group animate-in slide-in-from-right duration-300"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="p-2.5 bg-white shadow-sm border border-slate-100 rounded-2xl text-slate-400 group-hover:text-orange-500 group-hover:scale-110 transition-all">
                      {item.icon}
                    </div>
                    <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* AI Home Help - Grounded in Google Search */}
              <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-orange-500 p-1.5 rounded-lg">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Opebo Smart Help</span>
                  </div>
                  <h4 className="text-base font-black mb-2 leading-tight">Expert Advice via Google Search</h4>
                  <p className="text-[10px] text-slate-400 font-medium mb-6">Ask about maintenance, repairs, or DIY projects.</p>
                  
                  <form onSubmit={handleSmartSearch} className="relative mb-4">
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g., How to clean teak?"
                      className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 pl-4 pr-10 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500/50 text-white placeholder:text-white/20"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500">
                      {searchLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    </button>
                  </form>

                  {searchResult && (
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 animate-in fade-in duration-500">
                      <p className="text-[11px] leading-relaxed text-slate-300 mb-3 italic">"{searchResult.text}"</p>
                      {searchResult.sources.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest block mb-1">Web Sources:</span>
                          {searchResult.sources.slice(0, 2).map((s: any, i: number) => (
                            <a 
                              key={i} 
                              href={s.url} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex items-center gap-1.5 text-[9px] text-orange-400 hover:text-white transition-colors"
                            >
                              <ExternalLink size={10} /> {s.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-10 pt-4 border-t border-slate-50 flex items-center justify-between">
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">
                <Settings size={14} /> Account Settings
              </button>
              <span className="text-[8px] text-slate-200 font-black uppercase">v1.2.4</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
