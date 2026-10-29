import React from 'react';
import { Sparkles, ShoppingBag, Truck, HeartHandshake } from 'lucide-react';
import { BANNER_IMAGE } from '../data/cardapio';

interface BannerHeroProps {
  onStartOrder: (itemPrompt?: string) => void;
  onOpenCardapio: () => void;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  onStartOrder,
  onOpenCardapio,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#281811] via-[#381F13] to-[#281811] text-[#FDFBF7] rounded-2xl shadow-xl border border-[#D4AF37]/20 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center">
        {/* Left Column: Story & CTAs */}
        <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#4A2C1D]/80 border border-[#D4AF37]/40 px-3 py-1 rounded-full text-xs font-medium text-[#F3E5AB] w-fit shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Fornadas Artesanais Limitadas • Feitas sob Encomenda</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF] leading-tight">
            Nossas Fornadas já Começaram! 🍫✨
          </h2>

          <p className="text-sm sm:text-base text-[#E2D2C2] leading-relaxed">
            Chocotones artesanais de massa macia com gotas nobres, biscoitos amanteigados em formato floral e pão de mel com especiarias. Tudo preparado com amor e tradição de família.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs text-[#EADCCE] pt-1">
            <div className="flex items-center gap-2 bg-[#1E110A]/60 px-3 py-2 rounded-lg border border-[#4A2C1D]">
              <Truck className="w-4 h-4 text-[#E5C158] flex-shrink-0" />
              <span>Uber Moto ou Retirada</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1E110A]/60 px-3 py-2 rounded-lg border border-[#4A2C1D]">
              <HeartHandshake className="w-4 h-4 text-[#E5C158] flex-shrink-0" />
              <span>Fechamento no WhatsApp</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onStartOrder('Olá Dourada! Quero montar meu pedido para a próxima fornada!')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#1F120A] font-semibold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Falar com a Dourada
            </button>
            <button
              onClick={onOpenCardapio}
              className="px-4 py-2.5 rounded-xl bg-[#4A2C1D]/70 hover:bg-[#5E3725] text-[#F3E5AB] font-medium text-sm border border-[#D4AF37]/30 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
              Ver Cardápio
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual from uploaded photo */}
        <div className="md:col-span-5 h-64 md:h-full relative min-h-[220px]">
          <img
            src={BANNER_IMAGE}
            alt="Chocotones e Biscoitos Fornada Dourada"
            className="w-full h-full object-cover md:rounded-r-2xl border-t md:border-t-0 md:border-l border-[#D4AF37]/20"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-[#281811]/20 to-[#281811] pointer-events-none"></div>
          <div className="absolute bottom-3 right-3 bg-[#281811]/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-[#D4AF37]/30 text-[11px] text-[#F3E5AB] font-serif shadow-lg">
            O ponto perfeito do forno 🧡
          </div>
        </div>
      </div>
    </div>
  );
};
