import React, { useState } from 'react';
import classnames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { Location } from '@reach/router';
import { Link } from 'gatsby';

function exportData(location) {
  console.log(location);
}

const links = [
  { label: 'Bugs & Fish', url: '/' },
  { label: 'About', url: '/about' },
];

function Nav(props) {
  const { open, content, onClose, location } = props;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="shade"
            onClick={onClose}
          />
          <motion.nav
            initial={{ transform: 'translate(-100%)' }}
            animate={{ transform: 'translate(0%)' }}
            exit={{ transform: 'translate(-100%' }}
            // layoutTransition
            className={classnames('nav side', { open })}
          >
            {content}
            {links.map(link => (
              <Link
                to={link.url || ''}
                onClick={link.onClick}
                key={link.label}
                className={classnames('item', {
                  active: link.url === location.pathname,
                })}
              >
                {link.label}
              </Link>
            ))}
            {/* <Link onClick={() => exportData(location)} className="item">
              Export Data
            </Link> */}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export default function WrappedNav(props) {
  return <Location>{location => <Nav {...props} {...location} />}</Location>;
}
