import React from 'react';
import { MessageCircle, Sparkles, ShoppingBag, Truck, Info } from 'lucide-react';
import { LOGO_IMAGE, SLOGAN, WHATSAPP_DISPLAY } from '../data/cardapio';
import { createDirectWhatsAppLink } from '../utils/whatsapp';

interface HeaderProps {
  activeTab: 'chat' | 'cardapio' | 'logistica';
  setActiveTab: (tab: 'chat' | 'cardapio' | 'logistica') => void;
  orderCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  orderCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#281811] text-[#FDFBF7] border-b border-[#4A2C1D] shadow-md backdrop-blur-md bg-opacity-95">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('chat')}>
          <div className="relative">
            <img
              src={LOGO_IMAGE}
              alt="Fornada Dourada Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#D4AF37] object-cover shadow-inner hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#281811] rounded-full" title="Dourada Online"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#F3E5AB]">
                FORNADA DOURADA
              </h1>
              <span className="text-[11px] bg-[#4A2C1D] text-[#E5C158] px-2 py-0.5 rounded-full border border-[#D4AF37]/30 flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3 text-[#E5C158]" /> Atendente Dourada
              </span>
            </div>
            <p className="text-xs text-[#D8C7B5] italic font-serif tracking-wider">
              "{SLOGAN}"
            </p>
          </div>
        </div>

        {/* Navigation tabs & WhatsApp button */}
        <div className="flex items-center flex-wrap justify-center gap-2 w-full sm:w-auto">
          <nav className="flex items-center bg-[#1D110B] p-1 rounded-xl border border-[#4A2C1D]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#8B4513] text-[#FFF] shadow-sm font-semibold'
                  : 'text-[#D8C7B5] hover:text-[#FFF] hover:bg-[#321B11]'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-[#E5C158]" />
              Conversar
            </button>
            <button
              onClick={() => setActiveTab('cardapio')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'cardapio'
                  ? 'bg-[#8B4513] text-[#FFF] shadow-sm font-semibold'
                  : 'text-[#D8C7B5] hover:text-[#FFF] hover:bg-[#321B11]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
              Cardápio
            </button>
            <button
              onClick={() => setActiveTab('logistica')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'logistica'
                  ? 'bg-[#8B4513] text-[#FFF] shadow-sm font-semibold'
                  : 'text-[#D8C7B5] hover:text-[#FFF] hover:bg-[#321B11]'
              }`}
            >
              <Truck className="w-4 h-4 text-[#E5C158]" />
              Entrega & Info
            </button>
          </nav>

          <a
            href={createDirectWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-1.5 rounded-xl font-medium text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
            title="Falar direto no WhatsApp"
          >
            <span className="font-semibold">{WHATSAPP_DISPLAY}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
