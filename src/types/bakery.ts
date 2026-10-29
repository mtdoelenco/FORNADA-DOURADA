export interface CardapioItem {
  id: string;
  categoria: 'chocotone' | 'biscoito' | 'outros' | 'especial';
  nome: string;
  descricao: string;
  destaque?: boolean;
  tag?: string;
}

export interface OrderItem {
  item: string;
  quantidade: string;
  observacoes?: string;
}

export interface OrderAddress {
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  ponto_referencia?: string;
}

export interface OrderData {
  id: string;
  timestamp: string;
  nome_cliente: string;
  itens: OrderItem[];
  metodo_entrega: 'Uber Moto' | 'Retirada' | string;
  endereco?: OrderAddress;
  data_horario_desejado: string;
  resumo_texto?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  orderData?: OrderData;
}
