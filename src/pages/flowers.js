import React, { useEffect } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Icon from '../images/inline/Icon404.svg';
import { Link } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const NotFoundPage = () => {
  useEffect(() => {
    trackCustomEvent({
      category: '404',
      action: 'navigate',
      label: 'Page not found',
      value: window.location.pathname,
    });
  }, []);

  return (
    <Layout>
      <SEO title='404 HOOO WHOO' />
      <section>
        <h2>404 HOOO WHOO</h2>
        <p style={{ textAlign: 'center' }}>HOW DID WE GET HERE!?!</p>
        <Icon />
        <p />
        <Link to='/'>
          <button>Back to Safety!</button>
        </Link>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
