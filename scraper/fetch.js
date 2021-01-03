const puppeteer = require('puppeteer');
const getFish = require('./src/fish');
const getBugs = require('./src/bugs');
const getDiy = require('./src/diy');
const getMaterials = require('./src/materials');
const getObjectSizes = require('./src/objectSizes');
const getFlowers = require('./src/flowers');
const exec = require('child_process').exec;
const { download, writeJsonFile, processCritter } = require('./src/utils');
const fs = require('fs');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const skipImages = true;

function grabImage(record) {
  if (!record.fullImage) return record;
  let name = `${record.name}${record.fullImage.slice(record.fullImage.lastIndexOf('.'))}`;
  record.image = `../images/${record.type}/${name}`;
  if (record.fullImage.startsWith('data:')) {
    const [, ext, data] = record.fullImage.match(/^data:.+\/(.+);base64,(.*)$/);
    name = `${record.name}.${ext}`;
    record.image = `../images/${record.type}/${name}`;
    if (!skipImages) {
      const buffer = Buffer.from(data, 'base64');
      fs.writeFile(`${__dirname}/out/static/${record.type}/${name}`, buffer, console.log);
    }
  } else {
    if (!skipImages) {
      download(record.fullImage, `${__dirname}/out/static/${record.type}/${name}`);
    }
  }
  console.log('grab image', record);
  return {
    ...record,
    fullImage: `/static/${record.type}/${name}`,
  };
}

function getFilename(type) {
  return `${__dirname}/out/${type}.json`;
}

async function fetchFile(browser, type, func) {
  exec(`mkdir -p ./out/static/${type}`);
  return await func(browser)
    .then(data => data.map(grabImage))
    .then(data => writeJsonFile(getFilename(type), data));
}

async function transformFile(path, transform) {
  const data = require(path);
  const result = data.map(transform);
  // await writeJsonFile(path, result);
}

const collections = {
  fish: {
    filename: 'fish',
    fetch: getFish,
    transform: processCritter,
  },
  bugs: {
    filename: 'bugs',
    fetch: getBugs,
    transform: processCritter,
  },
  diy: {
    filename: 'diy',
    fetch: getDiy,
  },
  materials: {
    filename: 'materials',
    fetch: getMaterials,
  },
  objectSizes: {
    filename: 'objectSizes',
    fetch: getObjectSizes,
  },
  flowers: {
    filename: 'flowers',
    fetch: getFlowers,
  },
};

async function main() {
  const browser = await puppeteer.launch({ headless: false });

  // exec('rm -rf ./out');
  exec('mkdir -p ./out/static/diy');
  exec('mkdir -p ./out/static/fish');
  exec('mkdir -p ./out/static/bug');
  exec('mkdir -p ./out/static/material');
  exec('mkdir -p ./out/static/object_size');
  exec('mkdir -p ./out/static/flowers');
  let data = {};

  let fetches = (argv.fetch || '').split(',').filter(Boolean);
  let transforms = (argv.transform || '').split(',').filter(Boolean);

  console.log({ fetches, transforms });
  console.log({ argv });

  for (key of fetches) {
    if (!collections[key]) {
      console.error(`${key} is not recognized and cannot be processed`);
      continue;
    }
    const collection = collections[key];
    await fetchFile(browser, collection.filename, collection.fetch);
  }

  for (key of transforms) {
    if (!collections[key].transform) {
      console.warning(`${key} does not have a transform related to it`);
      continue;
    }
    await transformFile(getFilename(key), collections[key].transform);
  }

  await browser.close();
}

main();
