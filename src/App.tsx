import React, { useState } from 'react';
import { Header } from './components/Header';
import { BannerHero } from './components/BannerHero';
import { ChatBox } from './components/ChatBox';
import { CardapioSection } from './components/CardapioSection';
import { LogisticsSection } from './components/LogisticsModal';
import { OrderSummaryCard } from './components/OrderSummaryCard';
import { ChatMessage, OrderData, CardapioItem } from './types/bakery';
import { SLOGAN, WHATSAPP_DISPLAY, LOGO_IMAGE } from './data/cardapio';
import { createDirectWhatsAppLink } from './utils/whatsapp';
import { MessageCircle, ShoppingBag, Sparkles, Truck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'cardapio' | 'logistica'>('chat');
  const [orders, setOrders] = useState<OrderData[]>([]);

  // Initial greeting from Dourada
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_init',
      role: 'assistant',
      content: `Olá! Seja muito bem-vindo à Fornada Dourada! 🍫✨\n\nEu sou a Dourada, e aqui cada receita nasce do carinho e da tradição da nossa família para a sua mesa.\n\nComo posso adoçar o seu dia hoje?`,
      timestamp: new Date(),
    },
  ]);

  const handleOrderRegistered = (newOrder: OrderData) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleSelectItemFromCardapio = (item: CardapioItem) => {
    setActiveTab('chat');
    const userPrompt = `Olá Dourada! Gostaria de encomendar o ${item.nome}. Como fazemos?`;

    // Append and trigger chat response
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: userPrompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Send to backend
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let parsedOrder: OrderData | undefined = undefined;
        if (data.functionCall && data.functionCall.name === 'registrar_pedido') {
          const args = data.functionCall.args || {};
          parsedOrder = {
            id: 'ord_' + Date.now(),
            timestamp: new Date().toISOString(),
            nome_cliente: args.nome_cliente || 'Cliente Amigo',
            itens: Array.isArray(args.itens) ? args.itens : [],
            metodo_entrega: args.metodo_entrega || 'Uber Moto',
            endereco: args.endereco,
            data_horario_desejado: args.data_horario_desejado || 'A combinar',
            resumo_texto: args.resumo_texto || '',
          };
          handleOrderRegistered(parsedOrder);
        }

        const assistantMsg: ChatMessage = {
          id: 'ast_' + Date.now(),
          role: 'assistant',
          content: data.text || 'O ponto perfeito do forno ✨',
          timestamp: new Date(),
          orderData: parsedOrder,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      })
      .catch((err) => {
        console.error('Erro ao enviar item selecionado:', err);
      });
  };

  const handleAskAboutPanetone = () => {
    setActiveTab('chat');
    const userPrompt = 'Vocês fazem panetone tradicional de frutas cristalizadas?';
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: userPrompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const assistantMsg: ChatMessage = {
          id: 'ast_' + Date.now(),
          role: 'assistant',
          content: data.text || 'O ponto perfeito do forno ✨',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      })
      .catch((err) => console.error(err));
  };

  const handleStartOrderFromHero = (itemPrompt?: string) => {
    setActiveTab('chat');
    if (itemPrompt) {
      const userMsg: ChatMessage = {
        id: 'usr_' + Date.now(),
        role: 'user',
        content: itemPrompt,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const assistantMsg: ChatMessage = {
            id: 'ast_' + Date.now(),
            role: 'assistant',
            content: data.text || 'O ponto perfeito do forno ✨',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMsg]);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] text-[#281811] flex flex-col font-sans selection:bg-[#E5C158] selection:text-[#281811]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orderCount={orders.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {/* Banner Hero Showcase */}
        <BannerHero
          onStartOrder={handleStartOrderFromHero}
          onOpenCardapio={() => setActiveTab('cardapio')}
        />

        {/* Tab contents */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Main Column: Chat Box */}
            <div className="lg:col-span-8">
              <ChatBox
                messages={messages}
                setMessages={setMessages}
                onOrderRegistered={handleOrderRegistered}
                onOpenCardapio={() => setActiveTab('cardapio')}
                onOpenLogistica={() => setActiveTab('logistica')}
              />
            </div>

            {/* Right Column: Bakery Side Card & Orders List */}
            <div className="lg:col-span-4 space-y-4">
              {/* Family Bakery Badge Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#EADBCE] shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={LOGO_IMAGE}
                    alt="Fornada Dourada"
                    className="w-12 h-12 rounded-full border border-[#D4AF37] object-cover"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#281811]">
                      Fornada Dourada
                    </h3>
                    <p className="text-xs text-[#8B4513] italic font-serif">
                      "{SLOGAN}"
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#6C5546] space-y-2 border-t border-[#F5EDE1] pt-3">
                  <p className="flex items-center gap-2">
                    <span className="text-base">🍫</span>
                    <span>Chocotones com gotas nobres</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-base">🌸</span>
                    <span>Biscoitos amanteigados em formato floral</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-base">🛵</span>
                    <span>Envio exclusivo Moto Uber ou Retirada</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-base">✨</span>
                    <span>Fechamento humano no WhatsApp</span>
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('cardapio')}
                    className="w-full bg-[#FAF5EE] hover:bg-[#3D2314] hover:text-[#F3E5AB] text-[#3D2314] text-xs font-semibold py-2 rounded-xl border border-[#DFCFC0] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Consultar Cardápio Oficial
                  </button>
                </div>
              </div>

              {/* Registered Orders Quick Access */}
              {orders.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border-2 border-[#D4AF37] shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-[#F5EDE1] pb-2">
                    <h4 className="font-serif font-bold text-sm text-[#281811] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Pedidos Gerados ({orders.length})
                    </h4>
                    <span className="text-[10px] bg-[#E8F8EE] text-[#1E7E34] px-2 py-0.5 rounded-full font-semibold">
                      Prontos para Enviar
                    </span>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {orders.map((ord) => (
                      <OrderSummaryCard key={ord.id} order={ord} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cardapio' && (
          <CardapioSection
            onSelectItem={handleSelectItemFromCardapio}
            onAskAboutPanetone={handleAskAboutPanetone}
          />
        )}

        {activeTab === 'logistica' && <LogisticsSection />}
      </main>

      {/* Footer */}
      <footer className="bg-[#21140E] text-[#E0D2C2] border-t border-[#3D2314] py-8 mt-12 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_IMAGE}
              alt="Fornada Dourada"
              className="w-10 h-10 rounded-full border border-[#D4AF37] object-cover"
            />
            <div>
              <p className="font-serif font-bold text-sm text-[#F3E5AB]">FORNADA DOURADA</p>
              <p className="text-[11px] text-[#A68F7E] italic font-serif">"{SLOGAN}"</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#C9B5A3]">Confeitaria Artesanal • Produção 100% Fresca sob Encomenda</p>
            <p className="text-[#8F7666]">
              Envios por Uber Moto ou Retirada • Fechamento no WhatsApp: {WHATSAPP_DISPLAY}
            </p>
          </div>

          <a
            href={createDirectWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-xl font-medium flex items-center gap-1.5 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
