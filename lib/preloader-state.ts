// Vive fora do React de propósito: um F5 recarrega o JS do zero e reseta isso,
// mas navegação client-side (Link, botão voltar) mantém a mesma instância do
// JS rodando, então o preloader não toca de novo nessas navegações.
let hasShownPreloader = false

export function getHasShownPreloader() {
  return hasShownPreloader
}

export function setHasShownPreloader() {
  hasShownPreloader = true
}