import ItemBlock from 'components/ItemBlock';
import SearchOverlay from 'components/Search';
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import BottomNav, { FAB_BUTTON } from '../components/BottomNav/BottomNav';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SearchButton from '../images/inline/searchButton.svg';
import BackButton from '../images/inline/back.svg';

const DiyList = ({ recipes }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <Layout
      actions={
        <div data-desktop style={{ display: 'flex', alignItems: 'center', height: '100%'}}>
        <div data-desktop>
          {searchOpen ? (
            <BackButton style={{ color: 'white', cursor: 'pointer' }} onClick={() => setSearchOpen(false)} />
          ) : (
            <SearchButton style={{ cursor: 'pointer'}} onClick={() => setSearchOpen(true)} />
          )}
        </div>
        </div>
      }
    >
      <SEO title="DIY Recipes" />
      {searchOpen && <div className="shade" onClick={() => setSearchOpen(false)} />}
      {searchOpen && <SearchOverlay showResults attached />}
      <section>
        <h2>DIY Recipes</h2>
        <div className="grid">
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
