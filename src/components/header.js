import useAllData from 'app/queryAll';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import CloseButton from 'images/inline/closeButton.svg';
import SearchButton from 'images/inline/searchButton.svg';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import Hamburger from 'images/inline/hamburger.svg';
import Logo from 'images/inline/logo.svg';

const Search = props => {
  const data = useAllData();
  console.log({ data });
  const searchWidth = useMemo(
    () => Math.min(typeof window !== 'undefined' && window.innerWidth, 500),
    [typeof window !== 'undefined' && window]
  );
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={{ width: open ? searchWidth : 65 }}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        padding: '10px',
        display: 'flex',
        height: '66px',
        // color: open ? 'var(--primary)' : 'white',
      }}
    >
      <SearchButton
        onClick={() => setOpen(true)}
        style={{ position: 'absolute' }}
      />
      <motion.input
        animate={{
          // opacity: open ? 1 : 0,
          borderRadius: open ? '10px' : '50%',
        }}
        style={{
          width: '100%',
          paddingLeft: '50px',
          border: 'none',
          color: 'var(--secondary)',
        }}
      />
      <motion.div
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'initial' : 'none',
        }}
      >
        <CloseButton
          onClick={() => open && setOpen(false)}
          style={{ position: 'absolute', right: 0, top: 0, margin: '22px' }}
        />
      </motion.div>
    </motion.div>
  );
};

const Header = ({ siteTitle, actions, open, setOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false);

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
            justifyContent: 'center',
          }}
        >
          <Hamburger
            style={{ color: 'white', marginRight: '20px' }}
            onClick={() => setOpen(!open)}
          />
          <h1 style={{ margin: 0 }}>
            <Link
              to='/'
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              <Logo />
            </Link>
          </h1>
        </div>
        {/* <Search /> */}
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
