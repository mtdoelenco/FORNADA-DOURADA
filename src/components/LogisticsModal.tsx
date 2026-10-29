import React from 'react';
import { Truck, MapPin, DollarSign, MessageCircle, Clock, Heart, ShieldCheck } from 'lucide-react';
import { REGRAS_INFO, SLOGAN, WHATSAPP_DISPLAY } from '../data/cardapio';
import { createDirectWhatsAppLink } from '../utils/whatsapp';

export const LogisticsSection: React.FC = () => {
  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      {/* Introduction Card */}
      <div className="bg-[#281811] text-[#FDFBF7] rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-lg text-center space-y-3">
        <span className="text-3xl">🛵✨</span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
          Como Funcionam Nossos Pedidos & Envios
        </h3>
        <p className="text-sm sm:text-base text-[#D8C7B5] max-w-2xl mx-auto italic font-serif">
          "{SLOGAN}" — Transparência e carinho da nossa família para a sua mesa.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Logística */}
        <div className="bg-white rounded-2xl p-5 border border-[#EADBCE] shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8B4513]">
              <Truck className="w-5 h-5 text-[#8B4513]" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#281811]">
              Envio via Uber Moto ou Retirada
            </h4>
            <p className="text-xs sm:text-sm text-[#6C5546] leading-relaxed">
              Não temos entregador próprio nem frota. Despachamos o seu pedido quentinho via <strong>Moto Uber (Uber Flash Moto)</strong>, com a taxa paga diretamente por você na entrega (ou simulada pelo app da Uber).
            </p>
          </div>
          <div className="text-[11px] bg-[#FAF5EE] text-[#7A6153] p-2.5 rounded-lg border border-[#E8DDCE]">
            📍 Opção de Retirada no local mediante agendamento prévio.
          </div>
        </div>

        {/* Pillar 2: Preços */}
        <div className="bg-white rounded-2xl p-5 border border-[#EADBCE] shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8B4513]">
              <DollarSign className="w-5 h-5 text-[#8B4513]" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#281811]">
              Valores Sob Consulta
            </h4>
            <p className="text-xs sm:text-sm text-[#6C5546] leading-relaxed">
              {REGRAS_INFO.precos}
            </p>
            <p className="text-xs sm:text-sm text-[#6C5546] leading-relaxed">
              Trabalhamos com ingredientes de alta qualidade, chocolate nobre e fornadas 100% frescas sob encomenda.
            </p>
          </div>
          <div className="text-[11px] bg-[#FAF5EE] text-[#7A6153] p-2.5 rounded-lg border border-[#E8DDCE]">
            🍫 Sem surpresas: tudo é combinado antes do início da fornada.
          </div>
        </div>

        {/* Pillar 3: Fechamento Humano */}
        <div className="bg-white rounded-2xl p-5 border border-[#EADBCE] shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8B4513]">
              <ShieldCheck className="w-5 h-5 text-[#8B4513]" />
            </div>
            <h4 className="font-serif font-bold text-lg text-[#281811]">
              Confirmação Humana no WhatsApp
            </h4>
            <p className="text-xs sm:text-sm text-[#6C5546] leading-relaxed">
              A Dourada auxilia na montagem do pedido e prepara o link. O fechamento oficial, confirmação de data, valor total e chave PIX/pagamento são feitos pela equipe humana no WhatsApp.
            </p>
          </div>
          <div className="text-[11px] bg-[#E8F8EE] text-[#1E7E34] p-2.5 rounded-lg border border-[#C3E6CB] font-medium flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            Atendimento: {WHATSAPP_DISPLAY}
          </div>
        </div>
      </div>

      {/* WhatsApp Direct Action */}
      <div className="bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 border border-[#25D366]/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif font-bold text-base text-[#1F5C37]">
            Dúvidas Especiais ou Encomendas Maiores?
          </h4>
          <p className="text-xs sm:text-sm text-[#4E6E59]">
            Fale diretamente com a família Fornada Dourada no WhatsApp oficial.
          </p>
        </div>
        <a
          href={createDirectWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 flex-shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          Falar no {WHATSAPP_DISPLAY}
        </a>
      </div>
    </div>
  );
};
