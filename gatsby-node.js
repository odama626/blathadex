/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

const critterPageQuery = `
query AllCritter {
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
      }
    }
  }
}`;
const createCritterLink = critter =>
  `/critter/${critter.type}/${critter.name
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/[^a-zA-Z0-9-_]/g, '')}`;

const createCritterPage = createPage => critter => {
  return createPage({
    path: createCritterLink(critter),
    component: path.resolve('./src/templates/CritterPage.jsx'),
    context: {
      critter,
    },
  });
};

exports.createPages = async ({ graphql, ...gatsby }) => {
  const { createPage } = gatsby.actions;

  let results = await graphql(critterPageQuery);

  if (results.errors) throw new Error(results.errors);

  const critters = results.data.allCrittersJson.edges.map(edge => edge.node);

  return Promise.all(critters.map(createCritterPage(createPage)));
};
