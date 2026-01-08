
import React from 'react';
import { Home, ShoppingBag, Mail, User } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const BottomNav: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: <Home size={22} />, label: 'Home' },
    { id: 'bookings', icon: <div className="relative"><ShoppingBag size={22} /><span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">1</span></div>, label: 'Bookings' },
    { id: 'inbox', icon: <Mail size={22} />, label: 'Inbox' },
    { id: 'profile', icon: <User size={22} />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center z-[70] shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 transition-all relative ${
            activeTab === item.id ? 'text-orange-500' : 'text-slate-400'
          }`}
        >
          {item.icon}
          <span className={`text-[10px] font-bold ${activeTab === item.id ? 'opacity-100' : 'opacity-80'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
