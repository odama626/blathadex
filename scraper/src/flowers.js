const uniqby = require('lodash.uniqby');
const { batchPromise } = require('./utils');

module.exports = async function getFlowers(browser) {
  const page = await browser.newPage();

  let items = [];

  let lastCount = -1;
  let pageIndex = 1;

  while (items.length > lastCount) {
    await page.goto(`https://villagerdb.com/items/flowers/page/${pageIndex++}?game=nh`, {
      waitUntil: 'networkidle2',
    });
    console.log({ pageIndex });
    let newItems = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.search-result-container')).map(item => {
        const a = item.querySelector('a:not(.d-block)');
        const name = a.textContent;
        return {
          name,
          genus: name.split(' ').slice(-1)[0].toLowerCase(),
          color: name.split(' ').slice(0, -1).join(' ').toLowerCase(),
          fullImage: item.querySelector('img').src,
          type: 'flower',
          href: a.href,
        };
      })
    );
    lastCount = items.length;
    items.push(...newItems);
    items = uniqby(items, e => e.name);
  }

  page.close();

  let results = await batchPromise(items, flower => getFlower(browser, flower));

  return results;
};

async function getFlower(browser, flower) {
  const page = await browser.newPage();
  await page.goto(flower.href, { waitUntil: 'networkidle2' });

  let result = await page.evaluate(() => {
    const replaceMap = {
      'Orderable?': 'orderable',
      'Where to get': 'obtainedFrom',
      'Sells for': 'bells',
      Cost: 'cost',
    };

    function replace(key) {
      return replaceMap[key] || key;
    }
    let rows = Array.from(document.querySelectorAll('table.item-game-data tbody tr'))
      .map(row => Array.from(row.children).map(child => child.textContent))
      .map(row => [replace(row[0]), row[1].trim()]);

    let result = Object.fromEntries(rows);

    result.orderable = result.orderable && result.orderable.toLowerCase() !== 'no';

    result.bells = parseInt(result.bells);
    result.obtainedFrom = result.obtainedFrom.split('\n').map(s => s.trim());
    result.cost = parseInt(result.cost);

    return result;
  });

  page.close();

  const { href, ...keep } = flower;

  return { ...keep, ...result };
}
