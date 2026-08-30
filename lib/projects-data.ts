interface ProjectBase {
  slug: string
  title: string
  category: string
  cover: string
  gallery: string[]
  stack: string[]
  liveUrl?: string
  repoUrl?: string
}

export interface SystemProject extends ProjectBase {
  type: 'system'
  problema: string
  solucao: string
  resultado: string
}

export interface DashboardProject extends ProjectBase {
  type: 'dashboard'
  descricao: string
  medidas: string[]
}

export type Project = SystemProject | DashboardProject

// Ordem de exibição — também define a sequência de "Próximo projeto"
export const projectOrder = [
  'nordil-erp',
  'dentalreativa',
  'dashboard-logistica',
  'dashboard-comercial',
  'dashboard-ecommerce',
  'dashboard-operacao',
  'dashboard-rh',
  'dashboard-financeiro',
]

export const projectsData: Record<string, Project> = {
  'nordil-erp': {
    type: 'system',
    slug: 'nordil-erp',
    title: 'Nordil ERP',
    category: 'Sistema ERP · Full Stack',
    cover: '/images/projects/nordil-capa.png',
    gallery: [
      '/images/projects/login-nordil.png',
      '/images/projects/pedidos-nordil.png',
      '/images/projects/estoque-nordil.png',
      '/images/projects/relatorio-nordil.png',
    ],
    problema:
      'Distribuidoras de materiais elétricos precisam controlar um fluxo operacional inteiro, do pedido do cliente até a entrega, passando por reserva de estoque, separação, conferência e expedição, cada etapa com suas próprias regras e possibilidade de erro humano. O Nordil nasceu como projeto autoral pra estudar, na prática, como um ERP corporativo real lida com isso.',
    solucao:
      'Sistema completo cobrindo Cliente → Pedido → Reserva de Estoque → Separação → Conferência → Expedição → Entrega, com máquina de estados no pedido e um ledger de movimentações de estoque (nunca um update direto no saldo: toda alteração passa por RESERVA, LIBERACAO_RESERVA, ENTRADA, SAIDA ou AJUSTE dentro da mesma transação). Multi-tenant via empresaId vindo da sessão, três papéis de acesso (ADMIN, SUPERVISOR, OPERADOR) com funções operacionais específicas, auditoria completa de ações e um módulo de conferência que compara o que o separador registrou com o que o conferente realmente encontrou, sinalizando divergência automaticamente.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth.js', 'Zod', 'Zustand', 'Tailwind CSS', 'Recharts'],
    resultado:
      'Sistema funcional de ponta a ponta em PostgreSQL, nenhum módulo roda sobre mock ou localStorage. A parte mais desafiadora foi o estoque: não bastava alterar um número, era preciso pensar em reserva, entrada, saída, devolução, inventário e cancelamento sem deixar o saldo inconsistente, além de cenários como dois operadores mexendo no mesmo pedido ao mesmo tempo. Limitação assumida abertamente: ainda não tem testes automatizados nem CI/CD, é a primeira coisa que eu adicionaria se recomeçasse hoje.',
  },

  dentalreativa: {
    type: 'system',
    slug: 'dentalreativa',
    title: 'DentalReativa',
    category: 'SaaS · Full Stack',
    cover: '/images/projects/dentalreative-capa.png',
    gallery: [
      '/images/projects/login-dental.png',
      '/images/projects/pacientes-dental.png',
      '/images/projects/central-envios.png',
      '/images/projects/agenda-dental.png',
      '/images/projects/relatorio-dental.png',
    ],
    problema:
      'Clínicas odontológicas têm pacientes que simplesmente somem: não cancelam, não avisam, só param de aparecer. Softwares de agenda (Dental Office, Easy Dental) lembram quem TEM consulta marcada, mas ninguém rastreia quem deveria ter voltado e não voltou.',
    solucao:
      'Camada complementar que identifica pacientes em risco por dias sem consulta (médio: 180-269 dias, alto: 270-364, crítico: 365+, limites configuráveis por clínica) e organiza uma fila de recontato priorizada com envio via WhatsApp em 1 clique. Importação de planilha (CSV/Excel) com normalização de fuso horário pra evitar o clássico erro de "um dia a menos", 3 tentativas de contato configuráveis, e relatórios de funil de reativação e receita recuperada.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PostgreSQL (Neon)', 'node-postgres', 'NextAuth.js', 'Zod', 'SheetJS', 'Recharts'],
    resultado:
      'MVP em produção com frontend e backend funcionais (autenticação, banco, CRUD de pacientes). Envio de mensagem hoje é manual via wa.me, de propósito: validar o produto sem custo por mensagem antes de migrar pra WhatsApp Cloud API quando houver receita pra sustentar o custo. Próximos passos: timeline individual do paciente e métricas de desempenho de mensagens.',
    liveUrl: 'https://dentalreativa.vercel.app/',
  },

  'dashboard-logistica': {
    type: 'system',
    slug: 'dashboard-logistica',
    title: 'Dashboard Logística',
    category: 'Dashboard Web',
    cover: '/images/projects/dashboard-logistica.png',
    gallery: [
      '/images/projects/upload-dashoard.png',
      '/images/projects/dashboard-logistica.png',
    ],
    problema:
      'Dados de entrega geralmente vivem espalhados em planilha, sem indicador automático de SLA, atraso ou gasto com frete por transportadora, alguém precisa abrir o Excel e calcular tudo na mão toda vez.',
    solucao:
      'Sistema onde você arrasta um CSV ou Excel de entregas e ele gera sozinho os indicadores: entregas concluídas, em atraso, gasto total com frete, SLA por transportadora e análise de ocorrências por motivo. A parte mais interessante é como a classificação de atraso funciona: em vez de confiar no campo Status (digitado à mão, pode estar desatualizado), o sistema compara a Previsão de Entrega com a Entrega real: o texto do Status só decide estados terminais como Cancelado ou Extraviado.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'SheetJS', 'Recharts'],
    resultado:
      'Um bug real durante o desenvolvimento virou parte da história do projeto: uma função genérica de title-case capitalizava conectores ("com" → "Com"), transformando "Entregue com Atraso" em "Entregue Com Atraso", isso quebrava silenciosamente a comparação de string usada nos indicadores, e 6 pedidos atrasados sumiam dos contadores sem gerar nenhum erro visível. A correção trocou o title-case genérico por um dicionário fechado de sinônimos. Limitação conhecida: a comparação de datas usa o fuso do navegador de quem abre o dashboard, sem calendário de feriados da transportadora.',
    liveUrl: 'https://dashboard-logistica-nextjs.vercel.app/',
    repoUrl: 'https://github.com/kaykybazzan/dashboard-logistica-nextjs',
  },

  'dashboard-comercial': {
    type: 'dashboard',
    slug: 'dashboard-comercial',
    title: 'Dashboard Comercial',
    category: 'Power BI',
    cover: '/images/projects/dashboard-comercial.jpg',
    gallery: [],
    descricao:
      'Painel construído a partir de uma base em Excel pra analisar desempenho comercial: receita, lucro e margem, comparativo ano a ano, resultado por categoria e por localização, e ranking dos 10 principais vendedores. A ideia foi organizar os dados de forma que um gestor identifique rápido onde está ganhando mais e onde a margem está apertando.',
    medidas: ['Receita', 'Lucro Líquido', 'Margem %', 'Nº de Pedidos', 'Ticket Médio'],
    stack: ['Power BI', 'DAX', 'Excel'],
  },

  'dashboard-ecommerce': {
    type: 'dashboard',
    slug: 'dashboard-ecommerce',
    title: 'Dashboard E-commerce',
    category: 'Power BI',
    cover: '/images/projects/dashboard-ecommerce.jpg',
    gallery: [],
    descricao:
      'Primeiro projeto combinando SQL com Power BI. Base fictícia de e-commerce que chegou muito mais bagunçada do que o esperado, valores nulos, duplicados, erros de escrita, o mesmo produto aparecendo como se fossem vários diferentes. A maior parte do tempo não foi montar gráfico, foi decidir como tratar cada tipo de erro antes de qualquer visualização, usando SQL e Power Query.',
    medidas: ['Faturamento', 'Ticket Médio', 'Clientes Ativos', 'Qtd. de Itens', 'Crescimento YoY'],
    stack: ['SQL', 'Power Query', 'Power BI', 'DAX'],
  },

  'dashboard-operacao': {
    type: 'dashboard',
    slug: 'dashboard-operacao',
    title: 'Dashboard Operação',
    category: 'Power BI',
    cover: '/images/projects/dashboard-operacao.png',
    gallery: [],
    descricao:
      'Construído sobre uma base pública de e-commerce com mais de 99 mil pedidos, modelada em Star Schema. O objetivo não foi encher o painel de gráfico, foi responder perguntas de negócio específicas: onde o frete é mais caro, se faturar mais realmente significa lucrar mais, se a satisfação cai quando a entrega atrasa, e quais estados melhoraram mês a mês. Filtros de data e categoria permitem analisar cenário específico sem perder o contexto geral.',
    medidas: ['Faturamento', 'Total de Pedidos', 'Margem de Lucro', 'Ticket Médio', 'Variação MoM', 'Avaliação'],
    stack: ['Power BI', 'Star Schema', 'DAX'],
  },

  'dashboard-rh': {
    type: 'dashboard',
    slug: 'dashboard-rh',
    title: 'Dashboard RH',
    category: 'Power BI',
    cover: '/images/projects/dashboard-rh.jpg',
    gallery: [],
    descricao:
      'Painel de RH pensado pra leitura rápida, massa salarial, retenção, turnover, evolução de headcount 2024 vs 2025, turnover por departamento e headcount por cargo. A preocupação central foi não poluir o painel com métrica que não ajuda ninguém a decidir nada, deixando só o que sinaliza um problema real (turnover subindo, folha crescendo acima do esperado).',
    medidas: ['Massa Salarial', 'Taxa de Retenção', 'Turnover', 'Funcionários Ativos/Inativos', 'Headcount'],
    stack: ['Power BI', 'DAX'],
  },

  'dashboard-financeiro': {
    type: 'dashboard',
    slug: 'dashboard-financeiro',
    title: 'Dashboard Financeiro',
    category: 'Power BI',
    cover: '/images/projects/dashoard-financeiro.jpg',
    gallery: [],
    descricao:
      'Dashboard construído como instrumento de diagnóstico, não só painel visual, pra responder se a empresa está realmente lucrando ou só faturando alto, se os custos estão pressionando a margem, e se o caixa sustenta a operação nos próximos meses. Inclui estrutura de resultado (P&L) em cascata pra visualizar o impacto de cada grupo de custo e projeção de fluxo de caixa futuro.',
    medidas: ['Receita Bruta', 'Lucro Líquido', 'Margem de Lucro', 'Saldo Atual em Caixa'],
    stack: ['Power BI', 'DAX'],
  },
}

export function getAllProjectSlugs() {
  return Object.keys(projectsData)
}

export function getAdjacentProject(slug: string) {
  const idx = projectOrder.indexOf(slug)
  const nextSlug = projectOrder[(idx + 1) % projectOrder.length]
  return projectsData[nextSlug]
}