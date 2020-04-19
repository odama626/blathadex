/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const groupBy = require('lodash.groupby');

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
        materialsNeeded {
          count
          ingredient
        }
      }
    }
  }
  allMaterialsJson {
    edges {
      node {
        bells
        fullImage
        name
        obtainedFrom
        type
      }
    }
  }
}`;

const escapePath = s =>
  s
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/[^a-zA-Z0-9-\/_]/g, '');

const isSearchMatch = (a, b) =>
  a.length > 0 && a.filter((x, i) => ~b.indexOf(x)).length;

const createCritterPage = (createPage, groups) => critter => {
  return createPage({
    path: escapePath(`/critter/${critter.type}/${critter.name}`),
    component: path.resolve('./src/templates/CritterPage.jsx'),
    context: {
      critter,
      similar: groups[critter.loc && critter.loc.toLowerCase()],
    },
  });
};

const createDiyPage = (createPage, recipes) => diy => {
  let matches = recipes
    .filter(r => r !== diy && isSearchMatch(diy.search, r.search))
    .map(match => ({
      ...match,
      accuracy: isSearchMatch(match.search, diy.search),
    }));

  matches.sort((a, b) => b.accuracy - a.accuracy);

  diy.materialsNeeded = diy.materialsNeeded.map(material => {
    let recipe = recipes.find(
      r => r.name.toLowerCase() === (material.ingredient || '').toLowerCase()
    );
    let link;
    if (recipe) {
      link = escapePath(`/${recipe.section}/${recipe.name}`);
    } else {
      link = escapePath(`/material/${material.ingredient}`);
    }

    return {
      ...material,
      link,
    };
  });

  return createPage({
    path: escapePath(`/${diy.section}/${diy.name}`),
    component: path.resolve('./src/templates/DiyPage.jsx'),
    context: { diy, similar: matches },
  });
};

const createMaterialPage = (createPage, allRecipes) => material => {
  let name = material.name.toLowerCase();
  let recipes = allRecipes.filter(recipe =>
    recipe.materialsNeeded.find(
      m => ~(m.ingredient || '').toLowerCase().indexOf(name)
    )
  );

  return createPage({
    path: escapePath(`/material/${material.name}`),
    component: path.resolve('./src/templates/MaterialPage.jsx'),
    context: { material, recipes },
  });
};

exports.createPages = async ({ graphql, ...gatsby }) => {
  const { createPage } = gatsby.actions;
  let results = await graphql(critterPageQuery);
  const { allCrittersJson, allDiyJson, allMaterialsJson } = results.data;

  if (results.errors) throw new Error(results.errors);
  const critters = allCrittersJson.edges.map(edge => edge.node).filter(Boolean);
  const diys = allDiyJson.edges.map(edge => edge.node).filter(Boolean);
  const materials = allMaterialsJson.edges
    .map(edge => edge.node)
    .filter(Boolean);

  const critterGroups = groupBy(
    critters,
    critter => critter.loc && critter.loc.toLowerCase()
  );
  let promises = [];

  promises.push(critters.map(createCritterPage(createPage, critterGroups)));
  promises.push(diys.map(createDiyPage(createPage, diys)));
  promises.push(materials.map(createMaterialPage(createPage, diys)));

  return Promise.all(promises);
};
