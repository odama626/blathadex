const { maybe } = require('./utils');
const uniqBy = require('lodash.uniqby');

module.exports = async function getSizes(browser) {
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
    .then(arr => arr.flat())
    .then(arr => uniqBy(arr, 'name'));
};

async function getRecipeSection(browser, section) {
  const page = await browser.newPage();

  await page.addScriptTag({ content: `${maybe}` });

  await page.goto(section.href, { timeout: 0, waitUntile: 'networkidle2' });

  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('table.article-table tr'))
      .filter(item => item.children[0].tagName.toLowerCase() !== 'th')
      .map(item => {
        let children = Array.from(item.children);

        let size = children[3].querySelector('img');

        if (!size) return null;

        const src = size.dataset.src;
        const name = size.dataset.imageName;

        return {
          name: name.slice(0, name.lastIndexOf('.')),
          fullImage: src ? src.split('/revision')[0] : undefined,
          type: 'object_size',
        };
      })
      .filter(Boolean);
  });

  page.close();
  return data;
}
