
import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Plus, Hammer, Wrench, Package, Scissors, Check, Heart, Info, ChevronUp, ArrowRight } from 'lucide-react';

interface Props {
  service: ServiceItem;
  onAdd: (id: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onViewDetails?: () => void;
}

const ServiceCard: React.FC<Props> = ({ service, onAdd, isFavorite = false, onToggleFavorite, onViewDetails }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(service.id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'wrench': return <Wrench size={14} className="text-white" />;
      case 'hammer': return <Hammer size={14} className="text-white" />;
      case 'package': return <Package size={14} className="text-white" />;
      case 'scissors': return <Scissors size={14} className="text-white" />;
      default: return <Wrench size={14} className="text-white" />;
    }
  };

  return (
    <div className={`bg-white rounded-[2.5rem] p-4 mb-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-slate-50 relative group ${isExpanded ? 'ring-2 ring-orange-500/10 scale-[1.02]' : ''}`}>
      
      <div className="flex gap-5">
        {/* Image Container with Badges - FIXED OVERLAP HERE */}
        <div className="w-28 h-28 rounded-[2rem] overflow-hidden flex-shrink-0 bg-slate-100 shadow-inner relative group-hover:scale-105 transition-transform duration-700">
          <img 
            src={service.imageUrl} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          {/* Heart Badge */}
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(); }}
            className={`absolute top-2 right-2 p-2 rounded-xl backdrop-blur-md transition-all active:scale-75 shadow-lg ${
              isFavorite ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-300'
            }`}
          >
            <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          {/* Category Icon Badge */}
          <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-lg">
            {getIcon(service.categoryIcon)}
          </div>
        </div>
        
        {/* Content Area - Now completely clear of absolute icons */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="font-black text-slate-900 text-base leading-tight tracking-tight uppercase mb-1">{service.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{service.duration}</span>
              <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
              <div className="flex items-center gap-0.5">
                <Check size={10} className="text-green-500" />
                <span className="text-[9px] text-green-600 font-black uppercase tracking-widest">Master Pro</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Starting</p>
              <p className="text-xl font-black text-slate-900 tracking-tighter">₹ {service.startingPrice}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                className={`p-2.5 rounded-2xl transition-all ${isExpanded ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:text-orange-500'}`}
              >
                {isExpanded ? <ChevronUp size={18} /> : <Info size={18} />}
              </button>
              <button 
                onClick={handleAddClick}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-1 transition-all active:scale-95 shadow-xl ${
                  isAdded 
                  ? 'bg-green-600 text-white shadow-green-100' 
                  : 'bg-slate-900 text-white shadow-slate-200 hover:bg-orange-500'
                }`}
              >
                {isAdded ? <Check size={16} /> : <Plus size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Inline Content - Polished Designing */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100 space-y-6">
           <div>
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Service Intel</h4>
             <p className="text-slate-600 text-[13px] leading-relaxed font-medium">
               {service.description || "Elite craftsmanship combined with precision tools for your modern home infrastructure needs."}
             </p>
           </div>
           
           <div className="grid grid-cols-2 gap-3">
             {(service.benefits || ['6-Mo Warranty', 'Insured Pros', 'On-time Arrival']).map((b, i) => (
               <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                 <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center">
                    <Check size={10} className="text-green-600" />
                 </div>
                 <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">{b}</span>
               </div>
             ))}
           </div>

           <button 
            onClick={onViewDetails}
            className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white hover:border-orange-400 transition-all flex items-center justify-center gap-2 shadow-sm"
           >
             Reviews & Full Portfolio <ArrowRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
