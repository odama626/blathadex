const critters = require(`../src/data/flowers.json`);
const { writeJsonFile } = require('./src/utils');

const output = critters.map(critter => {
  const { fullImage } = critter;
  return {
    ...critter,
    image: fullImage.replace('/static/', '../images/') || '../images/diy404.png'
  }
});

writeJsonFile(`../src/data/flowers.json`, output)