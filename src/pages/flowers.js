import ItemBlock from 'components/ItemBlock';
import Layout from 'components/layout';
import SEO from 'components/seo';
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import SearchButton from '../images/inline/searchButton.svg';
import BackButton from '../images/inline/back.svg';
import SearchOverlay from 'components/Search';

const FlowersPage = ({ flowers }) => {
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
      }>
      <SEO title='Flowers' />
      {searchOpen && <div className="shade" onClick={() => setSearchOpen(false)} />}
      {searchOpen && <SearchOverlay showResults attached />}
      <section>
        <h2>Flowers</h2>
        <div className='grid'>
          {flowers.map(flower => (
            <ItemBlock item={flower} key={flower.id} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default function FlowerListContainer(props) {
  return <FlowersPage flowers={props.data.allFlowersJson.edges.map(edge => edge.node)} />;
}

export const query = graphql`
  query {
    allFlowersJson {
      edges {
        node {
          id
          type
          name
          genus
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
