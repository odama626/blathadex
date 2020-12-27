import { DiyBlock } from 'components/diy/Diy';
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import BottomNav, { FAB_BUTTON } from '../components/BottomNav/BottomNav';
import SearchOverlay from 'components/Search';
import ItemBlock from 'components/ItemBlock';
import { blockImage } from 'app/utils';

const DiyList = ({ recipes }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <Layout>
      <SEO title='DIY Recipes' />
      {searchOpen && <div className='shade' onClick={() => setSearchOpen(false)} />}
      {searchOpen && <SearchOverlay showResults attached />}
      <section>
        <h2>DIY Recipes</h2>
        <div className='grid'>
          {recipes.map(recipe => (
            <ItemBlock key={recipe.id} item={recipe} />
          ))}
        </div>
      </section>
      <BottomNav
        fabIconPath={searchOpen ? FAB_BUTTON.BACK : FAB_BUTTON.SEARCH}
        onFabClick={() => setSearchOpen(!searchOpen)}
        collapse={searchOpen}
      />
    </Layout>
  );
};

export default function DiyListContainer(props) {
  return <DiyList recipes={props.data.allDiyJson.edges.map(edge => edge.node)} />;
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
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
