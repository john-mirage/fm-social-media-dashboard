function animateNumbers(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number,
  unit: string = ""
) {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = String(Math.floor(progress * (end - start) + start)) + unit;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

export default animateNumbers;