const { getShadow, getRarity } = require('./utils');
const pageCount = 50;

module.exports = async function getFish(browser) {
  const page = await browser.newPage();
  await page.goto('https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)', {
    waitUntil: 'networkidle2',
  });

  let fish = await page.$$eval(
    'article#WikiaMainContent table.sortable td:first-child a',
    anchors => anchors.filter(a => a.href.length).map(({ title, href }) => ({ title, href }))
  );

  page.close();
  let results = [];

  while (fish.length) {
    let nextChunk = await Promise.all(
      fish.splice(0, pageCount).map(fish => getFishData(browser, fish))
    );
    results = [...results, ...nextChunk];
  }

  return results.map(processFish);
};

async function getFishData(browser, fish) {
  const page = await browser.newPage();
  await page.goto(fish.href, { waitUntil: 'networkidle2' });

  page.on('pageerror', err => {
    console.log('Error', fish.title, err.toString());
  });
  let results = await page.evaluate(() => {
    const table = document.querySelector('aside.portable-infobox');

    const getData = val => {
      let selector =
        table.querySelector(`.pi-data-value[data-source="${val}"]`) ||
        table.querySelector(`[data-source="${val}"] .pi-data-value`);
      return selector ? selector.textContent : null;
    };

    if (!table) {
      return { error: 'no data' };
    }
    const image = table.querySelector('[data-source="image"] img');

    const quote = Array.from(document.querySelectorAll('dd'))
      .map(t => t.textContent.trim())
      .filter(t => t.toLowerCase().match(/—.*new horizons/g))
      .map(t => t.split('—')[0]);

    return {
      fullImage: (image && image.src) || null,
      shadow: getData('shadow'),
      size: getData('size'),
      bells: getData('price'),
      rarity: getData('rarity'),
      sci: getData('scientific name'),
      family: getData('family'),
      location: getData('location'),
      year: getData('timeyear'),
      time: getData('timeday'),
      quote: (quote && quote[0]) || null,
      type: 'fish',
    };
  });

  results.name = fish.title
    .replace(/\(.+\)/g, '')
    .replace(/"/g, '')
    .trim();

  if (results.err) {
    console.error(results);
    return results;
  }

  page.close();

  return {
    ...results,
    fullImage: results.fullImage && results.fullImage.split('/revision')[0],
    quote: results.quote && results.quote.replace(/"/g, ''),
  };
}
