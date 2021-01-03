const { maybe } = require('./utils');

module.exports = async function getRecipes(browser) {
  const page = await browser.newPage();

  await page.goto('https://animalcrossing.fandom.com/wiki/DIY_recipes');
  const sections = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#mw-content-text li a')).map(({ title, href }) => ({
      title,
      href,
    }))
  );

  page.close();

  return Promise.all(sections.map(section => getRecipeSection(browser, section)))
    .then(arr => {
      console.log(arr);
      return arr;
    })
    .then(arr => arr.flat());
};

async function getRecipeSection(browser, section) {
  const page = await browser.newPage();

  await page.addScriptTag({ content: `${maybe}` });

  await page.goto(section.href, { timeout: 0, waitUntile: 'networkidle2' });
  const data = await page.evaluate(() => {
    const [header, ...items] = Array.from(document.querySelectorAll('table tr'));

    function maybe(path, obj, other = undefined) {
      const p = typeof path === 'string' ? path.split('.') : path;
      return (
        p.reduce(
          (result, next) => (result && result[next] !== 'undefined' ? result[next] : undefined),
          obj
        ) || other
      );
    }

    const headerKeys = Array.from(header.children).map(h => {
      let r = h.textContent.trim().replace(/(\s.)/g, r => r.toUpperCase().trim());
      return r[0].toLowerCase() + r.slice(1);
    });

    return items.map(row => {
      let cols = Array.from(row.children);
      let payload = cols.reduce((obj, next, i) => {
        obj[headerKeys[i]] = next.textContent.trim();
        return obj;
      }, {});
      payload.fullImage = cols[1].querySelector('img');
      delete payload.image;

      payload.size = cols[3].querySelector('img');

      payload.size = maybe('size.alt', payload);
      payload.materialsNeeded = cols[2].innerHTML
        .split('<br>')
        .map(row =>
          row
            .replace(/<.*?>/g, '')
            .replace(/(\d+)\s?x?\s?(\w+)/g, '$1|$2')
            .trim()
            .split('|')
        )
        .map(([count, ingredient]) => ({ count, ingredient }));

      payload.itemSellPrice = parseInt(
        (payload.itemSellPrice || payload.sellPrice || '')
          .replace(/<.*?>/g, '')
          .replace(',', '')
          .trim()
      );
      payload.fullImage = (maybe('fullImage.dataset.src', payload) || '').split('/revision')[0];

      payload.obtainedFrom = [payload.obtainedFrom].filter(Boolean);

      payload.name = payload.recipeName;
      payload.type = 'diy';
      delete payload.sellPrice;
      delete payload.recipeName;
      return payload;
    });
  });

  data.forEach(item => {
    item.section = section.title;
    let pieces = item.name && item.name.toLowerCase().trim().split(' ');
    item.search = Array.from(
      new Set(
        [[pieces[0], pieces[1]].join(' '), pieces[0], pieces.pop()]
          .map(p => p.trim())
          .filter(Boolean)
      )
    );
  });
  page.close();
  return data;
}
