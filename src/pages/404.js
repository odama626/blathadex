import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Icon from '../images/inline/Icon404.svg';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 HOOO WHOO" />
    <section>
      <h2>404 HOOO WHOO</h2>
      <p style={{ textAlign: 'center' }}>HOW DID WE GET HERE!?!</p>
      <Icon />
      <p />
      <Link to="/">
        <button>Back to Safety!</button>
      </Link>
    </section>
  </Layout>
);

export default NotFoundPage;
