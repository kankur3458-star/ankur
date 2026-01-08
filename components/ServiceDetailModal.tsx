
import React from 'react';
import { X, Star, Clock, Heart, ShieldCheck, ChevronRight, CheckCircle2, ShoppingBag, User } from 'lucide-react';
import { ServiceItem } from '../types';

interface Props {
  service: ServiceItem;
  onClose: () => void;
  onAdd: (id: string) => void;
}

const ServiceDetailModal: React.FC<Props> = ({ service, onClose, onAdd }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-t-[3.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[92vh] flex flex-col">
        {/* Header Image Area */}
        <div className="relative h-64 flex-shrink-0">
          <img src={service.imageUrl} className="w-full h-full object-cover" alt={service.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Top Controls */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
            <button 
              onClick={onClose} 
              className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-2xl text-white transition-all active:scale-90"
            >
              <X size={20} />
            </button>
            <button className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-2xl text-white transition-all active:scale-90">
              <Heart size={20} />
            </button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-orange-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Star size={12} fill="currentColor" /> PREMIUM SERVICE
              </div>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">{service.title}</h2>
          </div>
        </div>

        {/* Details Scroll Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-8 pb-32">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100 shadow-sm">
              <div className="flex justify-center text-orange-500 mb-1"><Star size={16} fill="currentColor" /></div>
              <p className="text-sm font-black text-slate-800">{service.rating || '4.8'}</p>
              <p className="text-[9px] text-slate-400 font-black uppercase">Rating</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100 shadow-sm">
              <div className="flex justify-center text-orange-500 mb-1"><Clock size={16} /></div>
              <p className="text-sm font-black text-slate-800">{service.duration}</p>
              <p className="text-[9px] text-slate-400 font-black uppercase">Time</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100 shadow-sm">
              <div className="flex justify-center text-orange-500 mb-1"><User size={16} /></div>
              <p className="text-sm font-black text-slate-800">{service.reviewsCount || '1.2k'}</p>
              <p className="text-[9px] text-slate-400 font-black uppercase">Reviews</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">About Service</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              {service.description || "Our elite professionals provide comprehensive solutions tailored to your modern living needs. Every job is handled with extreme care and professional precision."}
            </p>
          </div>

          {/* Benefits List */}
          <div className="mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">What's Included</h3>
            <div className="space-y-3">
              {(service.benefits || ['Professional Diagnosis', 'Certified Technicians', 'Genuine Spare Parts', 'Service Guarantee']).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-orange-50/50 p-4 rounded-2xl border border-orange-100/30">
                  <div className="bg-white p-1.5 rounded-full shadow-sm">
                    <CheckCircle2 size={16} className="text-orange-500" />
                  </div>
                  <span className="text-xs font-black text-slate-700 tracking-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden mb-4 group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10">
                <ShieldCheck size={28} className="text-orange-400" />
              </div>
              <div>
                <h4 className="font-black text-sm tracking-tight">Opebo Promise</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">100% Satisfaction or Money Back</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-between gap-6 z-10">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Value</p>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">₹ {service.startingPrice}</p>
          </div>
          <button 
            onClick={() => { onAdd(service.id); onClose(); }}
            className="flex-1 bg-orange-500 hover:bg-slate-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Add to Basket <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
