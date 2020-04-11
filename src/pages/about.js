import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

export default function AboutPage({ data }) {
  console.log({ data });
  return (
    <Layout>
      <SEO title="About" />
      <section>
        <h2>About Blathadex</h2>
        <p>
          Blathadex is a field guide to island life created want to keep track
          of their donations to Blathers. Through the use of the tool users can
          mark creatures as caught and find more information about creatures
          that are available. In the details section of each creature the user
          can find information about where and when is the optimal time to catch
          the criter.
        </p>
      </section>
      <section>
        <h2>About Us</h2>
        <p>
          We have enjoyed the game so much that we decided to pair up and take
          advantage of quarantine qualitiy time to produce Blathadex. As a
          developer and designer we hope this will be the first of many apps we
          will get to share with the world.
        </p>
        <Img
          fixed={data.file.childImageSharp.fluid}
          style={{ height: '300px', width: '100%' }}
        />
      </section>
      <section>
        <h2>Feedback</h2>
        <p>
          We are alway looking for ways to improve, please direct any feedback
          to our twitter account @
        </p>
        <p />
        <p>
          PS: It isn’t Comic Sans it’s Comic Nue which is entirely different. 😉
        </p>
      </section>
    </Layout>
  );
}

export const query = graphql`
  query image {
    file(relativePath: { eq: "aboutImage.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
