
import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Navigation, Plus, Home, Briefcase, MoreVertical, Check, ChevronRight } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const ManageAddress: React.FC<Props> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const savedAddresses = [
    { id: '1', type: 'Home', address: 'A23, Green Valley Apartment, Park Lane, Banjara Hills, Hyderabad, 802279', icon: <Home size={20} />, isDefault: true },
    { id: '2', type: 'Work', address: 'Plot 45, Tech Hub Towers, HITEC City, Hyderabad, 500081', icon: <Briefcase size={20} />, isDefault: false },
  ];

  return (
    <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Search Header - Google Maps Style */}
      <div className="px-6 py-6 border-b border-slate-50">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-xl transition-all active:scale-90">
            <ArrowLeft size={24} className="text-slate-800" />
          </button>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for an address..."
            className="flex-1 bg-transparent border-none focus:outline-none font-bold text-sm text-slate-800 placeholder:text-slate-300"
          />
          <div className="p-2 text-slate-400">
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Visual Map Area */}
        <div className="h-56 relative bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply grayscale" 
            alt="Map preview" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/40 animate-ping rounded-full blur-xl"></div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-10 border-2 border-orange-500">
                <MapPin size={24} className="text-orange-500 fill-orange-500/10" />
              </div>
            </div>
          </div>
          <button className="absolute bottom-6 right-6 flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest text-slate-800 active:scale-95 transition-transform">
            <Navigation size={18} className="text-orange-500" /> Current Location
          </button>
        </div>

        <div className="p-8">
          <button className="w-full flex items-center gap-4 p-5 bg-orange-50 rounded-3xl border border-orange-100 group active:scale-98 transition-all mb-10">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Add New Address</h4>
              <p className="text-[10px] text-orange-600/60 font-black uppercase tracking-widest">Pin your service location</p>
            </div>
            <ChevronRight size={20} className="ml-auto text-orange-300" />
          </button>

          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-2">Saved Locations</h3>
          
          <div className="space-y-4">
            {savedAddresses.map((addr) => (
              <div 
                key={addr.id}
                className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all relative group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
                      {addr.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{addr.type}</h4>
                        {addr.isDefault && (
                          <span className="bg-green-100 text-green-700 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                            <Check size={8} /> Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-200 hover:text-slate-500 active:scale-90 transition-transform">
                    <MoreVertical size={20} />
                  </button>
                </div>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed pl-1">
                  {addr.address}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-50 flex gap-4">
                   <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest px-4 py-2 hover:bg-orange-50 rounded-xl transition-colors">Modify</button>
                   <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-4 py-2 hover:text-red-500 rounded-xl transition-colors">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-slate-50">
        <button className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">
          Settings for Google Addresses
        </button>
      </div>
    </div>
  );
};

export default ManageAddress;
