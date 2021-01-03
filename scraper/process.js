const { writeJsonFile } = require('./src/utils');

const flowersRich = require('./out/flowers.json');
const flowersMix = require('./out/flowers-mix.json');

const pluralMap = [
  ['rose', 'roses'],
  ['hyacinth', 'hyacinths'],
  ['cosmos', 'cosmos'],
  ['windflower', 'windflowers'],
  ['tulip', 'tulips'],
  ['lily', 'lilies'],
  ['pansy', 'pansies'],
  ['mum', 'mums'],
];

const plu = pluralMap.map(p => p[1]);
const single = pluralMap.map(p => p[0]);

function singular(name) {
  let index = plu.indexOf(name.toLowerCase());
  if (!~index) index = single.indexOf(name.toLowerCase());
  if (!~index) throw name;
  let newName = pluralMap[index][0];

  return newName[0] + newName.slice(1);
}

function plural(name) {
  let index = single.indexOf(name.toLowerCase());
  if (!~index) index = plu.indexOf(name.toLowerCase());
  if (!~index) throw name;
  let newName = pluralMap[index][1];
  return newName[0] + newName.slice(1);
}

function splitColor(color) {
  return {
    hybrid: /[Ss]p\./.test(color) || /Special/.test(color),
    color: color
      .replace(/\(.+\)/g, '')
      .toLowerCase()
      .replace(/special/g, '')
      .replace('sp.', '')
      .trim(),
  };
}

let cleanFlowersMix = flowersMix.map(flower => {
  flower.genus = flower.type.toLowerCase();
  let { color, hybrid } = splitColor(flower.color);
  flower.color = color;
  flower.hybrid = hybrid;

  flower.a = splitColor(flower.a);
  flower.b = splitColor(flower.b);

  return flower;
});

cleanFlowersMix.filter(f => f.color === 'blue'); //?

let newFlowers = flowersRich.map(flower => {
  flower.genus = singular(flower.genus); //?
  flower.color = flower.color.toLowerCase(); //?

  flower.mixes = cleanFlowersMix
    .filter(f => f.genus === flower.genus && flower.color === f.color)
    .map(({ a, b }) => ({ a, b }));

  flower.obtainedFrom = flower.obtainedFrom
    .filter(x => x.toLowerCase().indexOf('hybrid') !== 0)
    .filter(x => x.toLowerCase().indexOf('crossbreeding') !== 0);
  return flower;
});

flowersRich; //?

writeJsonFile('./out/flowers.new.json', newFlowers);
