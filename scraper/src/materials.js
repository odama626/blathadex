module.exports = async function getMaterials(browser) {
  const page = await browser.newPage();

  await page.goto('https://animalcrossing.fandom.com/wiki/Crafting_materials_(New_Horizons)');

  let items = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('table.article-table tr'))
      .filter(item => item.children[0].tagName.toLowerCase() !== 'th')
      .map(item => {
        let payload = {};
        let children = Array.from(item.children);
        const name = children[0].textContent.trim();
        const fullImage = ((children[1].querySelector('img') || {}).dataset.src || '').split(
          '/revision'
        )[0];

        let obtainedFrom = children[2].innerText
          .replace(/\s(\w+)(\d+)/g, ' $1\n$2')
          .split('\n')
          .map(r => r.trim())
          .filter(r => r.length);

        let bells = (children[3].textContent || '').replace(/<.*?>/g, '').replace(',', '').trim();

        payload = {
          name,
          fullImage,
          type: 'material',
          obtainedFrom,
          bells,
        };
        return payload;
      });

    return items;
  });

  return items;
};
