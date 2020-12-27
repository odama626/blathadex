/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const groupBy = require('lodash.groupby');
const { getCritterLocation } = require('./src/app/node-shared');

const critterPageQuery = `
 {
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
        image {
          childImageSharp {
            fluid {
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
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
  allFlowersJson {
    edges {
      node {
        bells
        color
        cost
        fullImage
        genus
        id
        name
        obtainedFrom
        orderable
        type
        mixes {
          a {
            color
            hybrid
          }
          b {
            hybrid
            color
          }
        }
      }
    }
  }
}`;

const escapePath = s =>
  s
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/[^a-zA-Z0-9-\/_]/g, '');

const isSearchMatch = (a, b) => a.length > 0 && a.filter((x, i) => ~b.indexOf(x)).length;

const createCritterPage = (createPage, groups) => critter => {
  return createPage({
    path: escapePath(`/critter/${critter.type}/${critter.name}`),
    component: path.resolve('./src/templates/CritterPage.jsx'),
    context: {
      critter,
      similar: groups[getCritterLocation(critter.loc)],
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
      ...recipe,
      ...material,
      link,
      type: recipe ? 'diy' : 'material',
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
    recipe.materialsNeeded.find(m => ~(m.ingredient || '').toLowerCase().indexOf(name))
  );

  return createPage({
    path: escapePath(`/material/${material.name}`),
    component: path.resolve('./src/templates/MaterialPage.jsx'),
    context: { material, recipes },
  });
};

const createFlowerPage = ({ createPage, createRedirect }, allRecipes) => (flower, _, flowers) => {
  let name = flower.name.toLowerCase();
  let recipes = allRecipes.filter(recipe =>
    recipe.materialsNeeded.find(m => ~(m.ingredient || '').toLowerCase().indexOf(name))
  );
  let similar = flowers.filter(f => f.genus === flower.genus);

  createRedirect({
    fromPath: escapePath(`/material/${flower.name}`),
    isPermanent: true,
    redirectInBrowser: true,
    toPath: escapePath(`/flower/${flower.name}`),
  });

  return createPage({
    path: escapePath(`/flower/${flower.name}`),
    component: path.resolve('./src/templates/FlowerPage.jsx'),
    context: { flower, recipes, similar },
  });
};

exports.createPages = async ({ graphql, ...gatsby }) => {
  const { createPage, createRedirect } = gatsby.actions;
  let results = await graphql(critterPageQuery);
  const { allCrittersJson, allDiyJson, allMaterialsJson, allFlowersJson } = results.data;

  if (results.errors) throw new Error(results.errors);
  // const critters = allCrittersJson.edges.map(edge => edge.node).filter(Boolean);
  const diys = allDiyJson.edges.map(edge => edge.node).filter(Boolean);
  const materials = allMaterialsJson.edges.map(edge => edge.node).filter(Boolean);
  const flowers = allFlowersJson.edges.map(edge => edge.node).filter(Boolean);

  // const critterGroups = groupBy(critters, critter => getCritterLocation(critter.loc));

  let promises = [];

  // promises.push(critters.map(createCritterPage(createPage, critterGroups)));
  promises.push(diys.map(createDiyPage(createPage, diys)));
  promises.push(materials.map(createMaterialPage(createPage, diys)));
  promises.push(flowers.map(createFlowerPage({ createPage, createRedirect }, diys)));

  return Promise.all(promises);
};
