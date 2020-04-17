import { DiyBlock } from 'components/diy/Diy';
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const DiyList = ({ recipes }) => (
  <Layout>
    <SEO title="DIY Recipes" />
    <section>
      <h2>DIY Recipes</h2>
      <div className="grid">
        {recipes.map(recipe => (
          <DiyBlock key={recipe.id} diy={recipe} />
        ))}
      </div>
    </section>
  </Layout>
);

export default function DiyListContainer(props) {
  return (
    <DiyList recipes={props.data.allDiyJson.edges.map(edge => edge.node)} />
  );
}

export const query = graphql`
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
        }
      }
    }
  }
`;
