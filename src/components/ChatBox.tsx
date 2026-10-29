import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  RotateCcw,
  MessageCircle,
  ShoppingBag,
  Truck,
  Volume2,
  VolumeX,
  AlertTriangle,
} from 'lucide-react';
import { ChatMessage, OrderData } from '../types/bakery';
import { OrderSummaryCard } from './OrderSummaryCard';
import { LOGO_IMAGE, SLOGAN } from '../data/cardapio';

interface ChatBoxProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onOrderRegistered?: (order: OrderData) => void;
  onOpenCardapio: () => void;
  onOpenLogistica: () => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  setMessages,
  onOrderRegistered,
  onOpenCardapio,
  onOpenLogistica,
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext may be restricted before user gesture
    }
  };

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      // Prepare messages for server endpoint
      const serverPayload = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: serverPayload }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Erro HTTP: ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.text || 'O ponto perfeito do forno ✨';

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
        if (onOrderRegistered) {
          onOrderRegistered(parsedOrder);
        }
      }

      const assistantMsg: ChatMessage = {
        id: 'ast_' + Date.now(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date(),
        orderData: parsedOrder,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      playChime();
    } catch (err: any) {
      console.error('Falha no chat:', err);
      setErrorMsg(
        'Tivemos uma pequena oscilação na conexão com a Dourada. Você pode tentar novamente ou falar com nossa equipe pelo WhatsApp (21) 97086-2218!'
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleResetChat = () => {
    if (window.confirm('Deseja reiniciar a conversa com a Dourada?')) {
      const initialGreeting: ChatMessage = {
        id: 'welcome_' + Date.now(),
        role: 'assistant',
        content: `Olá! Seja muito bem-vindo à Fornada Dourada! 🍫✨\nEu sou a Dourada, e aqui cada receita nasce do carinho e da tradição da nossa família para a sua mesa.\nComo posso adoçar o seu dia hoje?`,
        timestamp: new Date(),
      };
      setMessages([initialGreeting]);
      setErrorMsg(null);
    }
  };

  const quickPrompts = [
    { label: '📜 Ver cardápio', text: 'Pode me apresentar o cardápio oficial?' },
    { label: '🛵 Como funciona a entrega?', text: 'Como funciona a entrega e o frete?' },
    { label: '🍫 Quero Chocotone trufado', text: 'Quero encomendar um Chocotone trufado com Nutella!' },
    { label: '🌸 Biscoitos amanteigados', text: 'Gostaria de pedir biscoitos amanteigados florais de baunilha.' },
    { label: '💰 Qual o valor?', text: 'Qual o valor dos chocotones?' },
    { label: '👍 Sim, pode gerar o link!', text: 'Sim, pode gerar o link para enviar ao WhatsApp!' },
  ];

  return (
    <div className="flex flex-col h-[650px] max-h-[82vh] bg-white rounded-2xl shadow-xl border border-[#EADBCE] overflow-hidden">
      {/* Chat Sub-Header */}
      <div className="bg-[#2D1B13] text-[#FDFBF7] px-4 py-2.5 flex items-center justify-between border-b border-[#4A2C1D]">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={LOGO_IMAGE}
              alt="Dourada Avatar"
              className="w-9 h-9 rounded-full border border-[#D4AF37] object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#2D1B13]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-sm text-[#F3E5AB]">Dourada</span>
              <span className="text-[10px] bg-[#4A2C1D] text-[#E5C158] px-1.5 py-0.2 rounded-full border border-[#D4AF37]/30">
                Fornada Dourada
              </span>
            </div>
            <p className="text-[11px] text-[#C9B5A3] italic font-serif">
              {SLOGAN} 🍫🧡
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 text-[#C9B5A3] hover:text-[#FFF] rounded-lg hover:bg-[#3D261B] transition-colors"
            title={soundEnabled ? 'Silenciar avisos' : 'Ativar som de avisos'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#E5C158]" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={handleResetChat}
            className="p-1.5 text-[#C9B5A3] hover:text-[#FFF] rounded-lg hover:bg-[#3D261B] transition-colors"
            title="Reiniciar conversa"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF6F0]/70">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-end gap-2 max-w-[88%] sm:max-w-[78%]">
                {isAssistant && (
                  <img
                    src={LOGO_IMAGE}
                    alt="Dourada"
                    className="w-7 h-7 rounded-full border border-[#D4AF37] object-cover flex-shrink-0 mb-1"
                  />
                )}

                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm text-sm sm:text-[14.5px] leading-relaxed ${
                    isAssistant
                      ? 'bg-white text-[#281811] rounded-bl-sm border border-[#EADBCE]'
                      : 'bg-[#3D2314] text-[#FFFDF8] rounded-br-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* If an order was registered by the assistant */}
                  {msg.orderData && (
                    <OrderSummaryCard order={msg.orderData} />
                  )}

                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      isAssistant ? 'text-[#9A8172]' : 'text-[#D8C7B5]'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-end gap-2">
            <img
              src={LOGO_IMAGE}
              alt="Dourada"
              className="w-7 h-7 rounded-full border border-[#D4AF37] object-cover flex-shrink-0 mb-1 animate-pulse"
            />
            <div className="bg-white border border-[#EADBCE] text-[#8B4513] text-xs px-4 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-2 shadow-sm">
              <span className="flex space-x-1">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#B38728] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#8B4513] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span className="font-serif italic">Dourada está preparando a resposta... ✨</span>
            </div>
          </div>
        )}

        {/* Error notice */}
        {errorMsg && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-xl flex items-start gap-2 shadow-sm">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p>{errorMsg}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Suggestion Chips */}
      <div className="bg-[#F6EFE6] px-3 py-2 border-t border-[#E8DDCE] overflow-x-auto whitespace-nowrap scrollbar-thin">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-serif font-bold text-[#7A6153] uppercase tracking-wider mr-1">
            Sugestões:
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(q.text)}
              disabled={isLoading}
              className="text-xs bg-white hover:bg-[#3D2314] hover:text-[#F3E5AB] text-[#4A2C1D] border border-[#DFCFC0] px-2.5 py-1 rounded-full font-medium transition-all shadow-2xs disabled:opacity-50 active:scale-95 flex-shrink-0"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white border-t border-[#EADBCE]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(inputText);
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Converse com a Dourada sobre chocotones, biscoitos ou faça seu pedido..."
            disabled={isLoading}
            className="flex-1 bg-[#FAF6F0] text-[#281811] placeholder-[#9A8172] text-sm px-4 py-2.5 rounded-xl border border-[#D8C7B5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-[#3D2314] hover:bg-[#8B4513] text-[#F3E5AB] px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
