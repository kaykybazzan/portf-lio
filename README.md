# Kayky Bazzan — Portfólio (Next.js)

Projeto completo, pronto para rodar. A identidade visual segue a referência do Dennis
Snellenberg (cortina de transição, saudações no loader, marquee, hover magnético), mas
com o bug de "cortina fantasma" corrigido na raiz — veja a seção **Sobre a cortina**
abaixo se quiser entender o porquê.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## O que já está pronto (comportamento, não visual)

- Loader com saudações multilíngues no primeiro carregamento (uma vez por sessão, via `sessionStorage`).
- Transição de página em cortina, com o `TransitionLink` fechando a cortina antes de navegar
  e o `app/template.tsx` reabrindo na página nova — sem nenhum elemento "sobrando" na tela.
- Scroll suave real via **Lenis**, sincronizado com o **GSAP ScrollTrigger**.
- Revelação de textos/seções ao rolar (`<Reveal>`).
- Botões e links com efeito magnético (`<Magnetic>`).
- Marquee com fade nas bordas e pausa suave no hover.
- Cursor customizado (dot que segue o mouse, cresce sobre links/botões — só em telas com mouse).
- Página de cada projeto (`/trabalho/[slug]`) gerada a partir de `lib/projects.ts`.
- Página `/dados` para os projetos de Power BI (grid compacto, sem competir com os 3 projetos principais).
- Página `/sobre` com a narrativa completa.
- 404 customizado, foco visível no teclado, `prefers-reduced-motion` respeitado.

## O que falta — e é só isso

1. **Imagens.** Todo lugar com `<ImagePlaceholder />` é intencional: sua foto no Hero,
   a capa de cada projeto (`/trabalho/[slug]`) e os 5 cards de `/dados`. Troque o componente
   por `<Image src="..." />` (de `next/image`) quando tiver os arquivos — os caminhos sugeridos
   já estão em `lib/projects.ts` (`cover: '/images/projects/...'`), é só colocar os arquivos em
   `public/images/projects/`.
2. **Links reais.** `mailto:seu-email@exemplo.com`, `github.com/seu-usuario` e
   `linkedin.com/in/seu-usuario` aparecem em `components/Footer.tsx` e em `lib/projects.ts`
   (campo `githubUrl`). Trocar por dados reais antes de publicar.
3. **`metadataBase`** em `app/layout.tsx` está apontando para um domínio de exemplo
   (`kaykybazzan.dev`) — troque pelo domínio real quando o projeto for publicado (Vercel, etc.),
   ou remova a linha se ainda não tiver domínio definido.

## Sobre a cortina (o bug que você tinha)

No código original, a "borda curva" da cortina era um `<div>` filho, posicionado com
`bottom-0` + `translate-y-full` dentro de um elemento pai que só se movia (nunca era
escondido de fato). Isso fazia a curva sobrar fixa na tela, sobrepondo o menu e o
conteúdo — exatamente o que aparecia nos seus prints.

Aqui a cortina é **um único elemento**: a curva não é um filho separado, é o próprio
`border-radius` do elemento sendo animado no fim da transição. Não existe pedaço
"escapando" do retângulo principal porque não existe um segundo elemento.

## Estrutura

```
app/
  layout.tsx        → fontes, providers, loader, nav
  template.tsx       → reabre a cortina a cada navegação
  page.tsx            → home
  sobre/page.tsx
  dados/page.tsx
  trabalho/[slug]/page.tsx
  not-found.tsx
components/
  TransitionProvider.tsx  → dono único da cortina
  TransitionLink.tsx      → link que fecha a cortina antes de navegar
  Loader.tsx
  SmoothScroll.tsx        → Lenis + ScrollTrigger
  CustomCursor.tsx
  Magnetic.tsx
  Reveal.tsx
  Marquee.tsx
  Nav.tsx
  Hero.tsx
  ProjectRow.tsx
  Footer.tsx
  ImagePlaceholder.tsx
lib/
  projects.ts        → conteúdo dos 3 projetos principais + 5 de dados
```
