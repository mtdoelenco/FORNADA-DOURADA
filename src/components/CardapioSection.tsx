import React from 'react';
import { Sparkles, MessageCircle, Info } from 'lucide-react';
import { CARDAPIO_OFICIAL, REGRAS_INFO } from '../data/cardapio';
import { CardapioItem } from '../types/bakery';

interface CardapioSectionProps {
  onSelectItem: (item: CardapioItem) => void;
  onAskAboutPanetone: () => void;
}

export const CardapioSection: React.FC<CardapioSectionProps> = ({
  onSelectItem,
  onAskAboutPanetone,
}) => {
  const chocotones = CARDAPIO_OFICIAL.filter((i) => i.categoria === 'chocotone');
  const biscoitos = CARDAPIO_OFICIAL.filter((i) => i.categoria === 'biscoito');
  const outros = CARDAPIO_OFICIAL.filter((i) => i.categoria === 'outros');

  return (
    <div className="space-y-8 py-2">
      {/* Notice Banner */}
      <div className="bg-[#FFF8E7] border border-[#F3E5AB] p-4 rounded-2xl flex items-start gap-3 shadow-sm">
        <Info className="w-5 h-5 text-[#B38728] flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#5D4638] space-y-1">
          <p className="font-semibold text-[#8B4513]">Sobre Valores e Produção Artesanal:</p>
          <p>{REGRAS_INFO.precos}</p>
          <p className="text-[12px] text-[#7A6153]">
            Cada receita é produzida fresca sob encomenda, com ponto perfeito do forno.
          </p>
        </div>
      </div>

      {/* CHOCOTONES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DDCE] pb-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#281811] flex items-center gap-2">
              <span>🍫</span> Chocotones Artesanais
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6153]">
              Massa macia artesanal com gotas nobres de chocolate selecionadas
            </p>
          </div>
          <span className="text-xs font-semibold bg-[#F7EFE3] text-[#8B4513] px-3 py-1 rounded-full border border-[#D4AF37]/30">
            5 Sabores
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chocotones.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EADBCE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#D4AF37]"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#281811] group-hover:text-[#8B4513] transition-colors">
                    {item.nome}
                  </h4>
                  {item.tag && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        item.destaque
                          ? 'bg-[#8B4513] text-white'
                          : 'bg-[#F4EDE2] text-[#7A6153]'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#6C5546] leading-relaxed mb-4">
                  {item.descricao}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F7F2E9] flex items-center justify-between">
                <span className="text-[11px] text-[#9A8172] italic">
                  Tamanho & valor no WhatsApp
                </span>
                <button
                  onClick={() => onSelectItem(item)}
                  className="bg-[#3D2314] hover:bg-[#8B4513] text-[#F3E5AB] text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Pedir com Dourada
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BISCOITOS AMANTEIGADOS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DDCE] pb-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#281811] flex items-center gap-2">
              <span>🌸</span> Biscoitos Amanteigados Tradicionais
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6153]">
              Formato floral/rosas clássico, crocantes e derretem na boca
            </p>
          </div>
          <span className="text-xs font-semibold bg-[#F7EFE3] text-[#8B4513] px-3 py-1 rounded-full border border-[#D4AF37]/30">
            4 Variedades
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {biscoitos.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-[#EADBCE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#D4AF37]"
            >
              <div>
                <span className="text-[11px] font-bold text-[#8B4513] uppercase tracking-wider block mb-1">
                  Amanteigado
                </span>
                <h4 className="font-serif font-bold text-base text-[#281811] group-hover:text-[#8B4513] mb-2">
                  {item.nome}
                </h4>
                <p className="text-xs text-[#6C5546] leading-relaxed mb-4">
                  {item.descricao}
                </p>
              </div>

              <button
                onClick={() => onSelectItem(item)}
                className="w-full bg-[#FAF5EE] hover:bg-[#3D2314] hover:text-[#F3E5AB] text-[#3D2314] text-xs font-semibold py-2 rounded-xl border border-[#E0D1BF] flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Pedir este sabor
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* OUTROS: PÃO DE MEL */}
      <section className="space-y-4">
        <div className="border-b border-[#E8DDCE] pb-2">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#281811] flex items-center gap-2">
            <span>🍯</span> Outras Delícias
          </h3>
          <p className="text-xs sm:text-sm text-[#7A6153]">
            Receitas especiais da família Fornada Dourada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outros.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-[#EADBCE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif font-bold text-lg text-[#281811]">
                    {item.nome}
                  </h4>
                  <span className="bg-[#8B4513] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    Artesanal
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#6C5546] leading-relaxed mb-4">
                  {item.descricao}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F7F2E9] flex items-center justify-between">
                <span className="text-[11px] text-[#9A8172] italic">
                  Consultar valores no WhatsApp
                </span>
                <button
                  onClick={() => onSelectItem(item)}
                  className="bg-[#3D2314] hover:bg-[#8B4513] text-[#F3E5AB] text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Pedir com Dourada
                </button>
              </div>
            </div>
          ))}

          {/* Panetone Tradicional Card */}
          <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-dashed border-[#D4AF37] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-bold text-lg text-[#281811]">
                  Panetone Tradicional (Frutas Cristalizadas)
                </h4>
                <span className="bg-[#EFE5D5] text-[#8B4513] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  Sob Consulta
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6C5546] leading-relaxed mb-4">
                Receita clássica com frutas cristalizadas selecionadas. Fornadas sob demanda específica com disponibilidade confirmada diretamente no WhatsApp.
              </p>
            </div>

            <button
              onClick={onAskAboutPanetone}
              className="w-full bg-[#E8DCcb] hover:bg-[#3D2314] hover:text-white text-[#3D2314] text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
              Perguntar disponibilidade à Dourada
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
