import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../images/inline/logo.svg';
import Hamburger from '../images/inline/hamburger.svg';

const Header = ({ siteTitle, actions, open, setOpen }) => {
  return (
    <header
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'Center',
          }}
        >
          <Hamburger
            style={{ color: 'white', marginRight: '20px' }}
            onClick={() => setOpen(!open)}
          />
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              <Logo />
            </Link>
          </h1>
        </div>
        <div>{actions}</div>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
