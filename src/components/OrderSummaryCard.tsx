import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, Clock, MapPin, User, Package, AlertCircle } from 'lucide-react';
import { OrderData } from '../types/bakery';
import { createWhatsAppLink, formatWhatsAppOrderMessage } from '../utils/whatsapp';
import { WHATSAPP_DISPLAY } from '../data/cardapio';

interface OrderSummaryCardProps {
  order: OrderData;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ order }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = formatWhatsAppOrderMessage(order);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isUberMoto = order.metodo_entrega.toLowerCase().includes('uber');
  const whatsappUrl = createWhatsAppLink(order);

  return (
    <div className="my-4 bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EE] rounded-2xl border-2 border-[#D4AF37] shadow-xl overflow-hidden text-[#281811]">
      {/* Header of the Card */}
      <div className="bg-gradient-to-r from-[#3D2314] to-[#281811] text-[#FDFBF7] px-4 py-3 flex items-center justify-between border-b border-[#D4AF37]/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#281811] flex items-center justify-center font-bold text-sm shadow-sm">
            ✨
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#F3E5AB]">
              Pedido Fornada Dourada
            </h4>
            <p className="text-[11px] text-[#D8C7B5] italic">O ponto perfeito do forno 🍫🧡</p>
          </div>
        </div>
        <span className="bg-[#4A2C1D] text-[#E5C158] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
          Aguardando WhatsApp
        </span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Customer & Desired Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F4EDE2] p-3 rounded-xl border border-[#E4D6C3]">
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-[#8B4513] mt-0.5" />
            <div>
              <p className="text-[11px] text-[#7A6153] uppercase font-bold tracking-wider">Cliente</p>
              <p className="text-sm font-semibold text-[#281811]">{order.nome_cliente}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#8B4513] mt-0.5" />
            <div>
              <p className="text-[11px] text-[#7A6153] uppercase font-bold tracking-wider">Fornada Desejada</p>
              <p className="text-sm font-semibold text-[#281811]">{order.data_horario_desejado}</p>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#7A6153]">
            <Package className="w-4 h-4 text-[#8B4513]" />
            <h5 className="text-xs font-bold uppercase tracking-wider">Itens Escolhidos</h5>
          </div>
          <div className="space-y-2 bg-white rounded-xl p-3 border border-[#E9DFCE] shadow-inner">
            {order.itens.map((item, i) => (
              <div key={i} className="flex items-start justify-between text-xs sm:text-sm py-1 border-b border-[#F5EFE6] last:border-0">
                <span className="font-medium text-[#281811]">
                  • {item.item}
                </span>
                <span className="font-semibold text-[#8B4513] bg-[#F7F2E9] px-2 py-0.5 rounded-md ml-2 flex-shrink-0">
                  {item.quantidade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery details */}
        <div className="bg-[#FAF5EC] p-3 rounded-xl border border-[#E8DDCE] space-y-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-semibold text-[#8B4513]">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Método: {order.metodo_entrega}</span>
          </div>

          {isUberMoto && order.endereco && (
            <div className="text-xs text-[#5D4638] pl-6 space-y-0.5">
              <p>
                <strong>Endereço:</strong> {order.endereco.rua || 'Rua informada'}
                {order.endereco.numero ? `, nº ${order.endereco.numero}` : ''}
                {order.endereco.bairro ? ` - Bairro ${order.endereco.bairro}` : ''}
              </p>
              {order.endereco.cidade && <p><strong>Cidade:</strong> {order.endereco.cidade}</p>}
              {order.endereco.ponto_referencia && (
                <p><strong>Ponto de referência:</strong> {order.endereco.ponto_referencia}</p>
              )}
            </div>
          )}

          <div className="flex items-start gap-1.5 text-[11px] text-[#7A6153] pt-1 border-t border-[#E8DDCE]/60">
            <AlertCircle className="w-3.5 h-3.5 text-[#B38728] mt-0.5 flex-shrink-0" />
            <span>
              {isUberMoto
                ? 'Despachado quentinho via Moto Uber. A taxa da corrida é paga diretamente por você na entrega (ou simulada no app).'
                : 'Retirada no local. O horário exato e localização serão confirmados com você no WhatsApp.'}
            </span>
          </div>
        </div>

        {/* Notice on prices & closing */}
        <div className="bg-[#FFF8E7] border border-[#F3E5AB] p-2.5 rounded-xl text-xs text-[#6B531F] flex items-center gap-2">
          <span className="text-base">🍫</span>
          <span>
            Os valores variam conforme tamanho e quantidade. Nossa equipe confirma tudo com você no WhatsApp para iniciar a produção!
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-1 flex flex-col sm:flex-row gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-bold text-center text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Enviar Pedido no WhatsApp</span>
          </a>

          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-[#EFE6D8] hover:bg-[#E5D7C3] text-[#4A2C1D] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#D8C7B5]"
            title="Copiar texto do pedido"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#8B4513]" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
