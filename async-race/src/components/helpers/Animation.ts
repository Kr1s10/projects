function getPositionAtCenter(el: HTMLElement) {
  const {
    top, left, width, height,
  } = el.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

function getDistanceBtwnElements(a: HTMLElement, b: HTMLElement) {
  const posA = getPositionAtCenter(a);
  const posB = getPositionAtCenter(b);

  return Math.hypot(posA.x - posB.x, posA.y - posB.y);
}

export default getDistanceBtwnElements;
