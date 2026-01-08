
import React from 'react';
import { CheckCircle, Star, Heart } from 'lucide-react';

interface Props {
  favorites?: string[];
  onToggleFavorite?: () => void;
}

const Hero: React.FC<Props> = ({ favorites = [], onToggleFavorite }) => {
  const isFavorite = favorites.includes('category_carpenter');

  return (
    <div className="mx-4 mt-20 mb-6 p-6 rounded-[2.5rem] hero-gradient relative overflow-hidden custom-shadow group">
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(); }}
        className={`absolute top-6 right-6 p-3 rounded-2xl backdrop-blur-md transition-all active:scale-90 shadow-lg ${
          isFavorite ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-white/80 text-slate-300 hover:text-rose-500'
        }`}
      >
        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} className={isFavorite ? 'animate-in zoom-in-50' : ''} />
      </button>

      <div className="flex items-start gap-5">
        {/* Character Image Placeholder */}
        <div className="w-24 h-24 flex-shrink-0 bg-white/50 rounded-[2rem] overflow-hidden border-2 border-white/80 shadow-inner group-hover:scale-105 transition-transform duration-500">
          <img 
            src="https://picsum.photos/seed/carpenter/200/200" 
            alt="Professional Carpenter" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">
            Carpenter <span className="font-medium text-slate-500">Services</span>
          </h2>
          <p className="text-gray-500 text-xs mt-1 font-bold uppercase tracking-wider">Home & Office Experts</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-xl text-[10px] font-black text-green-600 border border-green-100 shadow-sm uppercase">
              <CheckCircle size={12} fill="currentColor" className="text-white" /> Verified
            </span>
            <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-xl text-[10px] font-black text-orange-600 border border-orange-100 shadow-sm uppercase">
              <Star size={12} fill="currentColor" className="text-white" /> Premium
            </span>
          </div>

          <div className="flex items-center gap-2 mt-5 bg-white/40 w-fit px-3 py-1.5 rounded-2xl backdrop-blur-sm">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill="#f97316" className="text-orange-500" />
              ))}
            </div>
            <span className="text-xs font-black text-gray-900">4.7</span>
            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest ml-1 border-l border-gray-300 pl-2">12K+ Jobs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
