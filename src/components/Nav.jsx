import { Location } from '@reach/router';
import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'gatsby';
import React from 'react';

const links = [
  { label: 'Bugs & Fish', url: '/' },
  { label: 'About', url: '/about' },
  // { label: 'DIY Recipes', url: '/diy' },
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
            className={classnames('nav side', { open })}
          >
            {content}
            {links.map(link => (
              <Link
                to={link.url || ''}
                onClick={link.onClick}
                key={link.label}
                className={classnames('item', {
                  active:
                    link.url === location.pathname ||
                    link.url + '/' === location.pathname,
                })}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export default function WrappedNav(props) {
  return <Location>{location => <Nav {...props} {...location} />}</Location>;
}
