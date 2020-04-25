import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelectedContext } from 'app/context';

export default function SelectionWidget({ onSelect }) {
  const { selected, clear } = useSelectedContext();

  const handleSelect = () => {
    onSelect(selected);
    clear();
  };

  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.nav
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          key='selected'
          data-mobile
          data-selection
          className='bottom selection'
        >
          <header>
            <button className='error' onClick={clear}>
              Cancel
            </button>
            <button className='success' onClick={handleSelect}>
              Mark {selected.length} Caught!
            </button>
          </header>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
