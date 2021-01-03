const https = require('https');
const fs = require('fs');

module.exports.writeJsonFile = async function (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data, null, 2), err => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports.download = function (url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(cb);
    });
  });
};

module.exports.maybe = function (path, obj, other = undefined) {
  const p = typeof path === 'string' ? path.split('.') : path;
  return (
    p.reduce(
      (result, next) =>
        result && result[next] !== 'undefined' ? result[next] : undefined,
      obj
    ) || other
  );
};

module.exports.batchPromise = async function (srcList, mapFunc, chunSize = 50) {
  const list = [...srcList];
  let results = [];
  let nextChunk;
  while (list.length) {
    nextChunk = await Promise.all(list.splice(0, chunSize).map(mapFunc));
    results.push(...nextChunk);
  }
  return results;
};

function getShadow(shadow) {
  if (!shadow) return;
  let r = shadow
    .replace(/\),?\s?/, '), ')
    .split('), ')
    .find((r) => ~r.indexOf('NH') || ~r.indexOf('NL'));

  r = r ? r.split('(')[0].trim() : shadow;

  return r.toLowerCase();
}

function getRarity(rarity) {
  return rarity && rarity.split('(')[0].trim().toLowerCase();
}

module.exports.processCritter = function(critter) {
  const { quote, sci, size, shadow, family, rarity, } = critter;

  return {
    ...critter,
    shadow: getShadow(shadow),
    quote: quote && quote.trim(),
    family,
    size,
    sci: sci && sci.trim(),
    rarity: getRarity(rarity),
  };
}