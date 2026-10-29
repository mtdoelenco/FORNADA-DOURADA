import { CardapioItem } from '../types/bakery';

export const CARDAPIO_OFICIAL: CardapioItem[] = [
  // Chocotones
  {
    id: 'choc-comum',
    categoria: 'chocotone',
    nome: 'Chocotone comum com gotas de chocolate',
    descricao: 'Massa macia artesanal com gotas nobres de chocolate distribuídas por toda a fornada.',
    tag: 'Clássico',
  },
  {
    id: 'choc-brigadeiro',
    categoria: 'chocotone',
    nome: 'Chocotone trufado com brigadeiro',
    descricao: 'Recheio farto de brigadeiro cremoso artesanal feito no ponto certo.',
    destaque: true,
    tag: 'Mais Pedido',
  },
  {
    id: 'choc-nutella',
    categoria: 'chocotone',
    nome: 'Chocotone trufado com Nutella',
    descricao: 'Muito recheio generoso de Nutella pura e massa fofinha. Perfeito para presentear.',
    destaque: true,
    tag: 'Favorito',
  },
  {
    id: 'choc-ninho-morango',
    categoria: 'chocotone',
    nome: 'Chocotone de morango com leite Ninho',
    descricao: 'Combinação aveludada do autêntico leite Ninho com o frescor do morango.',
    tag: 'Especial',
  },
  {
    id: 'choc-maracuja',
    categoria: 'chocotone',
    nome: 'Chocotone de chocolate com maracujá',
    descricao: 'Equilíbrio marcante entre o chocolate intenso e o toque cítrico do maracujá.',
    tag: 'Autoral',
  },

  // Biscoitos
  {
    id: 'bisc-baunilha',
    categoria: 'biscoito',
    nome: 'Biscoitos amanteigados de Baunilha',
    descricao: 'Formato floral/rosas tradicional, crocantes por fora e derretem na boca.',
    destaque: true,
    tag: 'Formato Floral',
  },
  {
    id: 'bisc-chocolate',
    categoria: 'biscoito',
    nome: 'Biscoitos amanteigados de Chocolate',
    descricao: 'Massa amanteigada com cacau nobre, delicadamente desenhada em flores artesanais.',
    tag: 'Formato Floral',
  },
  {
    id: 'bisc-morango',
    categoria: 'biscoito',
    nome: 'Biscoitos amanteigados de Morango',
    descricao: 'Delicadeza aromática com toque suave de morango e textura amanteigada que derrete.',
    tag: 'Formato Floral',
  },
  {
    id: 'bisc-comum',
    categoria: 'biscoito',
    nome: 'Biscoitos amanteigados Tradicionais (Comum)',
    descricao: 'A pura receita clássica de família, sabor autêntico de manteiga de primeira linha.',
    tag: 'Formato Floral',
  },

  // Outros
  {
    id: 'pao-de-mel',
    categoria: 'outros',
    nome: 'Pão de mel',
    descricao: 'Massa aromática com especiarias da casa, mel puro e generosa cobertura de chocolate.',
    destaque: true,
    tag: 'Artesanal',
  },
];

export const WHATSAPP_NUMBER = '5521970862218';
export const WHATSAPP_DISPLAY = '(21) 97086-2218';
export const SLOGAN = 'O ponto perfeito do forno';
export const BANNER_IMAGE = '/assets/aistudio/Gemini_Generated_Image_pkdr2wpkdr2wpkdr_bf3c50e7.jpeg';
export const LOGO_IMAGE = '/assets/aistudio/Gemini_Generated_Image_lx63jhlx63jhlx63_72b54392.jpeg';

export const REGRAS_INFO = {
  precos:
    'Os valores variam conforme tamanho e quantidade, e a equipe confirma tudo com você no WhatsApp, certinho!',
  logistica:
    'Nossa produção é 100% fresca e sob encomenda. Não possuímos entregador próprio; despachamos o seu pedido quentinho via Moto Uber, e a taxa de envio é paga diretamente por você no ato da entrega (ou simulada pelo app da Uber). Também temos a opção de Retirada no local!',
  fechamento:
    'O fechamento oficial, confirmação de valores, frete e pagamento é realizado diretamente com nossa equipe humana pelo WhatsApp (21) 97086-2218.',
};
