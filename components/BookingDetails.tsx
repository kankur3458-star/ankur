
import React from 'react';
import { ArrowLeft, Clock, Calendar, MapPin, Heart, Info, Trash2, ArrowRight, ShieldCheck, Sparkles, LogIn } from 'lucide-react';
import { ServiceItem } from '../types';

interface Props {
  services: ServiceItem[];
  onBack: () => void;
  onRemove: (index: number) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  requireAuth: (action: () => void) => void;
  isAuthenticated: boolean;
}

const BookingDetails: React.FC<Props> = ({ services, onBack, onRemove, favorites, onToggleFavorite, requireAuth, isAuthenticated }) => {
  const totalPrice = services.reduce((acc, s) => acc + s.startingPrice, 0);
  const mainService = services[0] || { title: 'Booking', imageUrl: '', duration: 'TBD', startingPrice: 0 };

  const handleFinalPayment = () => {
    requireAuth(() => {
      // Logic for actual payment would go here
      alert("Payment initiated! (Demo logic)");
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-56 animate-in fade-in slide-in-from-right duration-300">
      {/* Premium Glass Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-[100] px-6 py-5 flex items-center justify-between border-b border-slate-100/50">
        <button onClick={onBack} className="p-2.5 bg-slate-100 rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-90">
          <ArrowLeft size={20} strokeWidth={3} />
        </button>
        <div className="text-center">
          <h1 className="text-base font-black text-slate-900 uppercase tracking-widest">Master Review</h1>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Step 3 of 4</p>
        </div>
        <div className="w-11"></div> {/* Spacer for symmetry */}
      </div>

      <div className="pt-20">
        {/* Featured Image with Overlay */}
        <div className="relative w-full h-64 overflow-hidden">
          <img 
            src={mainService.imageUrl} 
            alt={mainService.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
             <div className="bg-orange-500 p-2 rounded-xl shadow-lg">
                <Sparkles size={16} className="text-white" />
             </div>
             <div>
                <p className="text-[10px] text-white/80 font-black uppercase tracking-widest">Main Service</p>
                <h2 className="text-2xl font-black text-white tracking-tight">{mainService.title}</h2>
             </div>
          </div>
        </div>

        {/* Dynamic Summary Bar */}
        <div className="mx-6 -mt-10 mb-8 bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 grid grid-cols-3 divide-x divide-slate-50 relative z-10">
          <div className="flex flex-col items-center justify-center p-4 gap-1">
             <Clock size={16} className="text-orange-500" />
             <span className="text-[10px] font-black text-slate-800 uppercase">{services.length} Jobs</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 gap-1">
             <span className="text-base font-black text-slate-900 tracking-tighter">₹ {totalPrice}</span>
             <span className="text-[9px] font-black text-slate-400 uppercase">Total</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 gap-1">
             <Calendar size={16} className="text-orange-500" />
             <span className="text-[10px] font-black text-slate-800 uppercase">Today</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 space-y-10">
          {/* List Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Service Roster</h3>
              <div className="h-px flex-1 bg-slate-100 ml-4"></div>
            </div>
            
            <div className="space-y-4">
              {services.map((service, idx) => {
                const isFav = favorites.includes(service.id);
                return (
                  <div key={`${service.id}-${idx}`} className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 animate-in slide-in-from-right" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-inner flex-shrink-0">
                          <img src={service.imageUrl} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-sm tracking-tight uppercase leading-none mb-1.5">{service.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-widest">{service.duration}</span>
                            <span className="text-xs font-black text-slate-900 tracking-tight">₹ {service.startingPrice}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center gap-3 pl-4 border-l border-slate-50">
                         <button 
                          onClick={(e) => { e.stopPropagation(); onToggleFavorite(service.id); }}
                          className={`p-2.5 rounded-xl transition-all active:scale-75 ${isFav ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-300'}`}
                         >
                           <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                         </button>
                         <button 
                          onClick={() => onRemove(idx)}
                          className="p-2.5 bg-slate-50 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all active:scale-75"
                         >
                           <Trash2 size={18} />
                         </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
             <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-orange-500" />
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Service Location</h3>
                </div>
                <button 
                  onClick={() => requireAuth(() => {})} 
                  className="text-orange-500 text-[10px] font-black uppercase tracking-widest hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-all"
                >
                  Modify
                </button>
             </div>
             <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm relative group overflow-hidden">
               {!isAuthenticated ? (
                 <div className="py-4 text-center">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">Location Hidden for Guest</p>
                    <button onClick={() => requireAuth(() => {})} className="flex items-center gap-2 text-[10px] font-black text-orange-500 mx-auto uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-xl">
                      <LogIn size={14} /> Add Address
                    </button>
                 </div>
               ) : (
                 <>
                   <div className="absolute top-4 right-6 flex items-center gap-1.5 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 font-black text-[9px] uppercase tracking-widest">Verified Home</span>
                   </div>
                   <p className="text-slate-800 text-sm font-bold leading-relaxed mt-8 max-w-[85%]">
                     A23, Green Valley Apartment, Park Lane, Banjara Hills, Hyderabad, 802279
                   </p>
                 </>
               )}
             </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">Arrival Slot</h3>
             <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 flex items-center gap-5">
                <div className="bg-orange-50 p-4 rounded-[1.5rem]">
                  <Clock size={28} className="text-orange-500" />
                </div>
                <div>
                   <p className="text-slate-900 font-black text-xl tracking-tight">Today, 10:30 AM</p>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Allocation in Progress</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Floating Final Action Bar */}
      <div className="fixed bottom-10 left-6 right-6 z-[120]">
        <div className="bg-slate-900/95 backdrop-blur-2xl p-5 rounded-[2.5rem] shadow-2xl shadow-orange-500/20 flex items-center justify-between border border-white/10">
          <div className="pl-2">
            <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-0.5">Grand Total</p>
            <p className="text-2xl font-black text-white tracking-tighter">₹ {totalPrice}</p>
          </div>
          <button 
            onClick={handleFinalPayment}
            className="bg-orange-500 hover:bg-white hover:text-orange-500 text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-orange-500/20"
          >
            {isAuthenticated ? 'Confirm & Pay' : 'Sign in to Pay'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
