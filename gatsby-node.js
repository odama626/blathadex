/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

const critterPageQuery = `
 {
  allCrittersJson {
    edges {
      node {
        bells
        name
        no
        id
        etime
        etime2
        smonth
        smonth2
        stime
        stime2
        type
        size
        loc
        emonth2
        emonth
        desc
        rarity
        quote
      }
    }
  }
  allDiyJson {
    edges {
      node {
        itemSellPrice
        name
        obtainedFrom
        recipeItem
        search
        section
        size
        type
        id
        materialsNeeded
      }
    }
  }
}`;

const escapePath = s =>
  s
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/[^a-zA-Z0-9-\/_]/g, '');

const createCritterPage = createPage => critter => {
  return createPage({
    path: escapePath(`/critter/${critter.type}/${critter.name}`),
    component: path.resolve('./src/templates/CritterPage.jsx'),
    context: {
      critter,
    },
  });
};

const isSearchMatch = (a, b) =>
  a.length > 0 && a.filter((x, i) => ~b.indexOf(x)).length;

const createDiyPage = (createPage, recipes) => diy => {
  let matches = recipes
    .filter(r => r !== diy && isSearchMatch(diy.search, r.search))
    .map(match => ({
      ...match,
      accuracy: isSearchMatch(match.search, diy.search),
    }));

  matches.sort((a, b) => b.accuracy - a.accuracy);

  return createPage({
    path: escapePath(`/${diy.section}/${diy.name}`),
    component: path.resolve('./src/templates/DiyPage.jsx'),
    context: { diy, similar: matches },
  });
};

exports.createPages = async ({ graphql, ...gatsby }) => {
  const { createPage } = gatsby.actions;
  let results = await graphql(critterPageQuery);
  const { allCrittersJson, allDiyJson } = results.data;

  if (results.errors) throw new Error(results.errors);
  let promises = [];

  promises.push(
    allCrittersJson.edges
      .map(edge => edge.node)
      .map(createCritterPage(createPage))
  );

  const diys = allDiyJson.edges.map(edge => edge.node);

  promises.push(diys.map(createDiyPage(createPage, diys)));

  return Promise.all(promises);
};
