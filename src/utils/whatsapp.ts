import { OrderData } from '../types/bakery';
import { WHATSAPP_NUMBER } from '../data/cardapio';

export function formatWhatsAppOrderMessage(order: OrderData): string {
  const itemsText = order.itens
    .map((item, idx) => `  ${idx + 1}. *${item.item}* (${item.quantidade})${item.observacoes ? ` - _${item.observacoes}_` : ''}`)
    .join('\n');

  let enderecoText = '';
  if (order.metodo_entrega.toLowerCase().includes('uber') && order.endereco) {
    const { rua, numero, bairro, cidade, cep, ponto_referencia } = order.endereco;
    const parts = [
      rua ? `${rua}${numero ? `, nº ${numero}` : ''}` : '',
      bairro ? `Bairro: ${bairro}` : '',
      cidade ? `Cidade: ${cidade}` : '',
      cep ? `CEP: ${cep}` : '',
      ponto_referencia ? `Ref: ${ponto_referencia}` : '',
    ].filter(Boolean);
    enderecoText = parts.length > 0 ? parts.join(' | ') : 'A combinar no WhatsApp';
  }

  const message = `✨ *NOVO PEDIDO - FORNADA DOURADA* ✨
_O ponto perfeito do forno_ 🍫🧡

👤 *Cliente:* ${order.nome_cliente}
📅 *Fornada Desejada:* ${order.data_horario_desejado}
🛵 *Método:* ${order.metodo_entrega}${enderecoText ? `\n📍 *Endereço:* ${enderecoText}` : ''}

📦 *ITENS DA ENCOMENDA:*
${itemsText}

${order.resumo_texto ? `📝 *Observações:* ${order.resumo_texto}\n` : ''}
---
Olá equipe Fornada Dourada! Montei meu pedido com a atendente virtual Dourada e aguardo a confirmação dos valores, taxa da Moto Uber e agendamento da fornada. Muito obrigado! 🍪`;

  return message;
}

export function createWhatsAppLink(order: OrderData): string {
  const message = formatWhatsAppOrderMessage(order);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function createDirectWhatsAppLink(customText?: string): string {
  const defaultText = encodeURIComponent(
    'Olá equipe Fornada Dourada! Gostaria de tirar uma dúvida sobre as fornadas e encomendas. 🍫✨'
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${customText ? encodeURIComponent(customText) : defaultText}`;
}
