const critters = require(`../blathadex/src/data/diy.json`);
const { writeJsonFile } = require('./src/utils');

const output = critters.map(critter => {
  const { fullImage } = critter;
  return {
    ...critter,
    image: fullImage.replace('/static/', '../images/') || '../images/diy404.png'
  }
});

writeJsonFile(`../blathadex/src/data/diy.json`, output)