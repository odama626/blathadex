import Layout from 'components/layout';
import SEO from 'components/seo';
import { graphql, Link } from 'gatsby';
import Icon from 'images/inline/Icon404.svg';
import React from 'react';

const FlowersPage = () => {
  return (
    <Layout>
      <SEO title='Flowers' />
      <section>
        <h2>Flowers</h2>
        <Icon />
        <p />
        <Link to='/'>
          <button>Back to Safety!</button>
        </Link>
      </section>
    </Layout>
  );
};

export default FlowersPage;

export const query = graphql`
  query {
    allFlowersJson {
      edges {
        node {
          type
          color
          a
          b
        }
      }
    }
  }
`;
