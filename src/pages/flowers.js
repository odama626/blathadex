import Layout from 'components/layout';
import SEO from 'components/seo';
import { graphql, Link } from 'gatsby';
import Icon from 'images/inline/Icon404.svg';
import React from 'react';
import ItemBlock from 'components/ItemBlock';

const FlowersPage = ({ flowers }) => {
  return (
    <Layout>
      <SEO title='Flowers' />
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
          type
          name
          genus
        }
      }
    }
  }
`;
