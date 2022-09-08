import {
  colorAlph, lengthOfColor, models, names, numberOfRandomCars,
} from '../types/constants';

function getRandomName() {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
}

function getRandomColor() {
  let color = '#';
  for (let i = 0; i < lengthOfColor; i += 1) {
    color += colorAlph[Math.floor(Math.random() * colorAlph.length)];
  }
  return color;
}

export default function generateRandomCars(count = numberOfRandomCars) {
  return new Array(count).fill(1).map(() => ({ name: getRandomName(), color: getRandomColor() }));
}
