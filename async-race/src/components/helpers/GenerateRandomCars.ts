import { colorAlph, models, names } from '../../types/constants';

function getRandomName() {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
}

function getRandomColor() {
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += colorAlph[Math.floor(Math.random() * colorAlph.length)];
  }
  return color;
}

export default function generateRandomCars(count = 100) {
  return new Array(count).fill(1).map(() => ({ name: getRandomName(), color: getRandomColor() }));
}
