/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import './base.scss';
import Header from './header';
import './layout.css';
import Nav from './Nav';

const Layout = ({ children, actions = undefined, navBar= undefined }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav open={open} content={navBar} onClose={() => setOpen(false)} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        actions={actions}
        open={open}
        setOpen={setOpen}
      />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 966,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
