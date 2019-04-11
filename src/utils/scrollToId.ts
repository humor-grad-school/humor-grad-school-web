export default function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  const targetX = target.offsetLeft;
  const targetY = target.offsetTop;
  window.scroll({
    left: targetX,
    top: targetY,
    behavior: 'smooth',
  });
}
