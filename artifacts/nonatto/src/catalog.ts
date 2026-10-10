export type Category = 'Restaurantes' | 'Cafés' | 'Doces';
export type MenuItem = { id: string; name: string; description: string; price: number };
export type Restaurant = {
  id: string; name: string; category: Category; note: string;
  address: string; addressSource: string; logo: string; items: MenuItem[];
};

// Representative selections and illustrative prices, not live merchant catalogs.
const menu = (entries: [string, string, number][]): MenuItem[] =>
  entries.map(([name, description, price], i) => ({ id: `item-${i + 1}`, name, description, price }));

export const restaurants: Restaurant[] = [
  {
    id: 'almanara', name: 'Almanara', category: 'Restaurantes', note: 'Cozinha árabe',
    address: 'Rua Oscar Freire, 523 · Cerqueira César, São Paulo',
    addressSource: 'https://vejasp.abril.com.br/estabelecimento/almanara-cerqueira-cesar',
    logo: 'https://almanara.com.br/_2024/wp-content/themes/almanara/img/logo-red.svg',
    items: menu([
      ['Sfiha de carne', 'Massa artesanal e carne temperada. Porção com 4.', 42],
      ['Falafel', 'Grão-de-bico, ervas e especiarias. Porção com 6.', 48],
      ['Michui de filet mignon', 'Espetos de filet mignon com arroz e acompanhamentos.', 118],
      ['Bekleua', 'Massa delicada, nozes e calda aromática.', 32],
    ]),
  },
  {
    id: 'rascal', name: 'Ráscal', category: 'Restaurantes', note: 'Italiana contemporânea',
    address: 'Rua Leopoldo Couto de Magalhães Júnior, 831 · Itaim Bibi, São Paulo',
    addressSource: 'https://vejasp.abril.com.br/estabelecimento/rascal-itaim-bibi/',
    logo: 'https://www.rascal.com.br/wp-content/uploads/2020/05/logo-rascal.png',
    items: menu([
      ['Ravioli de mussarela', 'Massa fresca, mussarela e molho de tomate.', 84],
      ['Penne ao pomodoro', 'Penne, tomates e manjericão fresco.', 69],
      ['Filet mignon', 'Medalhão acompanhado de risoto de parmesão.', 124],
      ['Tiramisù', 'Mascarpone, café e cacau.', 38],
    ]),
  },
  {
    id: 'barbacoa', name: 'Barbacoa', category: 'Restaurantes', note: 'Cortes & brasa',
    address: 'Rua Dr. Renato Paes de Barros, 65 · Itaim Bibi, São Paulo',
    addressSource: 'https://itaimbibi.sampa.br/lugar/barbacoa-itaim',
    logo: 'https://www.barbacoa.com.br/wp-content/uploads/2025/06/cropped-favicon-300x300.png',
    items: menu([
      ['Picanha', 'Corte na brasa, arroz, farofa e vinagrete.', 139],
      ['Bife de chorizo', 'Corte argentino e batatas rústicas.', 149],
      ['Salmão grelhado', 'Salmão e legumes sazonais.', 118],
      ['Pudim de leite', 'Pudim cremoso com caramelo.', 29],
    ]),
  },
  {
    id: 'fasano', name: 'Fasano', category: 'Restaurantes', note: 'Tradição italiana',
    address: 'Rua Vittorio Fasano, 88 · Jardins, São Paulo',
    addressSource: 'https://fasano.com.br/en/contact/',
    logo: 'https://fasano.com.br/wp-content/themes/fasano/assets/images/logo.svg',
    items: menu([
      ['Tagliolini al pomodoro', 'Massa fresca e molho de tomates.', 138],
      ['Risotto ai funghi', 'Arroz carnaroli, cogumelos e parmesão.', 158],
      ['Filetto', 'Filet mignon com redução de vinho e purê.', 218],
      ['Tiramisù', 'Café, mascarpone e cacau.', 58],
    ]),
  },
  {
    id: 'bacio', name: 'Bacio di Latte', category: 'Doces', note: 'Gelato artesanal',
    address: 'Rua Vieira de Moraes, 772 · Campo Belo, São Paulo',
    addressSource: 'https://baciodilatte.com.br/inauguracoes-lojas',
    logo: 'https://baciodilatte.com.br/wp-content/themes/baciodilatte/assets/images/logo-vs-new.svg',
    items: menu([
      ['Gelato Bacio di Latte', 'Gelato de leite. Pote de 500 ml.', 64],
      ['Gelato de pistache', 'Pistache e textura cremosa. Pote de 500 ml.', 72],
      ['Gelato de chocolate', 'Chocolate intenso. Pote de 500 ml.', 64],
      ['Milkshake de baunilha', 'Gelato batido com leite. 400 ml.', 32],
    ]),
  },
  {
    id: 'fahrenheit', name: 'Fahrenheit', category: 'Restaurantes', note: 'Cozinha contemporânea',
    address: 'Av. Pres. Juscelino Kubitschek, 2041 · JK Iguatemi, Vila Olímpia, São Paulo',
    addressSource: 'https://livemenu.app/menu/630e5950d77947002b5d400b',
    logo: 'https://static.wixstatic.com/media/2d8778_eabf4d2f7c484e028cc3e669d7ef4bed~mv2.png/v1/fill/w_275,h_107,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo-padr%C3%A3o-png.png',
    items: menu([
      ['Filet mignon grelhado', 'Filet mignon, purê e molho da casa.', 129],
      ['Salmão com legumes', 'Salmão grelhado e legumes da estação.', 112],
      ['Risoto de camarão', 'Arroz cremoso, camarões e ervas.', 118],
      ['Cheesecake', 'Creme de queijo e calda de frutas vermelhas.', 39],
    ]),
  },
  {
    id: 'dengo', name: 'Dengo', category: 'Doces', note: 'Chocolate brasileiro',
    address: 'Av. Brigadeiro Faria Lima, 196 · Pinheiros, São Paulo',
    addressSource: 'https://www.dengo.com.br/fabrica-de-dengo',
    logo: 'https://dengo.com/cdn/shop/files/logo.png?v=1680542020&width=600',
    items: menu([
      ['Quebra-Quebra', 'Chocolate com castanhas brasileiras. 200 g.', 68],
      ['Chocolate 70% cacau', 'Chocolate de origem brasileira. 80 g.', 29],
      ['Caixa de trufas', 'Seleção de trufas de chocolate. 9 unidades.', 89],
      ['Drágeas de café', 'Grãos de café cobertos com chocolate. 100 g.', 39],
    ]),
  },
  {
    id: 'jun-sakamoto', name: 'Jun Sakamoto', category: 'Restaurantes', note: 'Japonesa contemporânea',
    address: 'Rua Lisboa, 55 · Pinheiros, São Paulo',
    addressSource: 'https://www.junsakamoto.com.br/',
    logo: 'https://www.junsakamoto.com.br/static/reservas_index_static/images/junlogo.png',
    items: menu([
      ['Seleção de sushi', 'Seleção de niguiris. 10 unidades.', 188],
      ['Sashimi de salmão', 'Fatias de salmão. 12 unidades.', 128],
      ['Temaki de atum', 'Atum, arroz e alga nori.', 58],
      ['Missoshiru', 'Caldo de missô, tofu e cebolinha.', 28],
    ]),
  },
  {
    id: 'pobre-juan', name: 'Pobre Juan', category: 'Restaurantes', note: 'Parrilla argentina',
    address: 'Av. Magalhães de Castro, 12000 · Shopping Cidade Jardim, São Paulo',
    addressSource: 'https://pobrejuan.com.br/',
    logo: 'https://pobrejuan.com.br/assets/images/logo.svg',
    items: menu([
      ['Bife ancho', 'Corte da parrilla e batatas rústicas.', 168],
      ['Bife de chorizo', 'Corte argentino com chimichurri.', 158],
      ['Prime rib', 'Corte com osso na brasa. Para compartilhar.', 248],
      ['Panqueque de doce de leite', 'Panqueca e doce de leite argentino.', 42],
    ]),
  },
  {
    id: 'starbucks', name: 'Starbucks', category: 'Cafés', note: 'Café & bebidas',
    address: 'Av. Pres. Juscelino Kubitschek, 2041 · JK Iguatemi, São Paulo',
    addressSource: 'https://laptopfriendly.co/sao-paulo/starbucks-jk-iguatemi',
    logo: 'https://cdn-cms-sbux.zamp.com.br//favcon_512_323208f0d8/favcon_512_323208f0d8.png?v=1779807899318',
    items: menu([
      ['Caffè Latte', 'Espresso e leite vaporizado. 350 ml.', 23],
      ['Cappuccino', 'Espresso, leite e espuma. 350 ml.', 23],
      ['Cold Brew', 'Café extraído a frio. 350 ml.', 25],
      ['Croissant', 'Massa folhada amanteigada.', 18],
    ]),
  },
  {
    id: 'veridiana', name: 'Veridiana', category: 'Restaurantes', note: 'Pizzaria',
    address: 'Rua José Maria Lisboa, 493 · Jardins, São Paulo',
    addressSource: 'https://www.veridiana.com.br/nossas-casas',
    logo: 'https://www.veridiana.com.br/imagens/logos/logo-veridiana.png',
    items: menu([
      ['Margherita', 'Tomate, mussarela e manjericão fresco.', 98],
      ['Calabrese', 'Calabresa artesanal, cebola e azeitonas.', 104],
      ['Quattro formaggi', 'Seleção de quatro queijos.', 118],
      ['Meringata', 'Merengue, creme e frutas vermelhas.', 38],
    ]),
  },
  {
    id: 'the-coffee', name: 'The Coffee', category: 'Cafés', note: 'Café de especialidade',
    address: 'Alameda Jaú, 476 · Jardim Paulista, São Paulo',
    addressSource: 'https://thecoffee.jp/shortcut/brasil/sao-paulo/the-coffee-alameda-jau',
    logo: 'https://thecoffee.jp/favicon.png',
    items: menu([
      ['Espresso', 'Café de especialidade. Dose dupla.', 12],
      ['Flat White', 'Espresso e leite cremoso. 180 ml.', 19],
      ['Iced Latte', 'Espresso, leite e gelo. 300 ml.', 22],
      ['Matcha Latte', 'Matcha e leite. 300 ml.', 24],
    ]),
  },
];
