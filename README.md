# Kayky Bazzan — Portfólio

Site pessoal / portfólio, construído em Next.js, reunindo os projetos que venho desenvolvendo: sistemas full-stack (Nordil ERP, DentalReativa, Dashboard Logística) e dashboards de análise de dados em Power BI.

Demonstração: [em breve]

## Sobre o projeto

Estrutura, animações e conteúdo foram desenvolvidos com apoio de IA (Claude), sob minha direção — decisões de design, revisão de código e conteúdo de cada projeto são meus. O objetivo foi apresentar cada trabalho da forma mais honesta possível, deixando claro o que cada um resolve, quais decisões técnicas foram tomadas e quais são as limitações reais.

## Funcionalidades

- Preloader com sequência de saudação multilíngue e transição de cortina ao entrar no site
- Hero com foto, badge de disponibilidade e navegação por âncora
- Seção Sobre Mim com stack em destaque
- Grid de projetos com duas fileiras animadas (sistemas full-stack e dashboards Power BI), separadas por categoria
- Página de detalhe dinâmica por projeto (`/projects/[slug]`), com dois templates diferentes dependendo do tipo:
  - **Case study completo** (sistemas): capa, problema, solução, stack, resultado, galeria de telas e links pro projeto no ar / repositório
  - **Template enxuto** (dashboards Power BI): imagem grande do relatório, descrição e medidas de destaque
- Transição de página (cortina) entre a home e as páginas de projeto
- Navegação sequencial entre projetos ("Próximo projeto") e CTA de contato ao final de cada página

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Animação | Framer Motion |
| Ícones | Lucide React |
| Deploy | Vercel |

## Estrutura do projeto

```
portfolio
├── app/
│   ├── page.tsx                 # Home (Hero, Sobre, Projetos, Contato)
│   ├── template.tsx             # Transição de página
│   └── projects/
│       └── [slug]/
│           └── page.tsx         # Rota dinâmica de detalhe de projeto
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Footer.tsx
│   ├── Preloader.tsx
│   ├── PageTransition.tsx
│   ├── TransitionContext.tsx
│   └── projects/
│       ├── CaseStudyLayout.tsx  # Template de sistemas
│       ├── DashboardLayout.tsx  # Template de dashboards
│       ├── ProjectNav.tsx       # Navegação entre projetos
│       └── ContactCTA.tsx       # CTA de contato
├── lib/
│   └── projects-data.ts         # Dados de todos os projetos
└── public/
    └── images/
        └── projects/
```

## Como rodar localmente

Pré-requisitos: Node.js 20+

```bash
# 1. Clonar o repositório
git clone https://github.com/kaykybazzan/portfolio.git
cd portfolio

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Adicionando um novo projeto

Todo o conteúdo dos projetos vive em `lib/projects-data.ts`. Pra adicionar um novo:

1. Cria uma nova entrada no objeto `projectsData`, com `type: 'system'` (case study completo) ou `type: 'dashboard'` (template enxuto)
2. Adiciona o `slug` na lista `projectOrder`, na posição desejada
3. Coloca as imagens em `public/images/projects/`

O roteador (`app/projects/[slug]/page.tsx`) escolhe automaticamente o template certo com base no `type`.

## Status

Em desenvolvimento ativo. Conteúdo dos projetos sendo preenchido e refinado.

## Autor

Kayky Bazzan
LinkedIn: [linkedin.com/in/kaykybazzan](https://www.linkedin.com/in/kaykybazzan)
GitHub: [github.com/kaykybazzan](https://github.com/kaykybazzan)

## Licença

Proprietário — todos os direitos reservados © 2026