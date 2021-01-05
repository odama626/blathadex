import useAppContext, { updateFilter, updateSort } from 'app/context';
import { motion } from 'framer-motion';
import bells from 'images/inline/bagOfBells.svg';
import bug from 'images/inline/bug.svg';
import catchesCheck from 'images/inline/catchesCheck.svg';
import fish from 'images/inline/fish.svg';
import northernHemisphere from 'images/inline/northernHemisphere.svg';
import order from 'images/inline/order.svg';
import southernHemisphere from 'images/inline/southernHemisphere.svg';
import React, { useState } from 'react';
import { FAB_BUTTON } from './BottomNav/BottomNav';
import Switcher from './Switcher';
import ToggleImage from './ToggleImage';

const navTrayMotion = {
  initial: { height: 0 },
  animate: { height: 'auto' },
  exit: { height: 0 },
};

export const Filter = ({ toggleFilter, filter, dispatch, desktop = false }) => (
  <motion.div {...navTrayMotion} {...(desktop ? { initial: false } : {})}>
    <div className='bottom nav tray'>
      <div className='title'>Select to show or hide...</div>
      <div className='section'>
        <ToggleImage
          Svg={fish}
          label='Fish'
          checked={filter.type?.indexOf('fish') > -1}
          onChange={toggleFilter('fish')}
        />
        <ToggleImage
          Svg={bug}
          label='Bugs'
          checked={filter.type?.indexOf('bug') > -1}
          onChange={toggleFilter('bug')}
        />
        <ToggleImage
          Svg={catchesCheck}
          label='My Catches'
          checked={!filter.caught}
          onChange={() => dispatch(updateFilter({ caught: !filter.caught }))}
        />
      </div>
    </div>
  </motion.div>
);

export const Sort = ({ sort, dispatch, desktop = false }) => (
  <motion.div {...navTrayMotion} {...(desktop ? { initial: false } : {})}>
    <div className='bottom nav tray'>
      <div className='title'>Sort by...</div>
      <div className='section'>
        <ToggleImage
          Svg={bells}
          label='Bells'
          checked={sort === 'bells'}
          onChange={() => dispatch(updateSort('bells'))}
        />
        <ToggleImage
          Svg={catchesCheck}
          label='My Catches'
          checked={sort === 'caught'}
          onChange={() => dispatch(updateSort('caught'))}
        />
        <ToggleImage
          Svg={order}
          label='Order'
          checked={sort === 'no'}
          onChange={() => dispatch(updateSort('no'))}
        />
      </div>
    </div>
  </motion.div>
);

export const Settings = ({ filter, dispatch, desktop = false }) => (
  <motion.div {...navTrayMotion} {...(desktop ? { initial: false } : {})}>
    <div className='bottom nav tray'>
      <div className='title'>Select your Hemisphere</div>
      <div className='section'>
        <Switcher
          big
          options={[
            { label: 'Northern', value: 'northern', Svg: northernHemisphere },
            { label: 'Southern', value: 'southern', Svg: southernHemisphere },
          ]}
          value={filter.hemisphere}
          onChange={hemisphere => dispatch(updateFilter({ hemisphere }))}
        />
      </div>
    </div>
  </motion.div>
);

export default function FilterWidget(props) {
  const [state, dispatch] = useAppContext();
  const filter = state.filter;
  const [menu, setMenu] = useState('');

  const toggleFilter = value => checked => {
    let type = (filter.type || []).filter(f => f !== value);
    if (checked) type.push(value);
    dispatch(updateFilter({ type }));
  };

  const toggleMenu = mode => () => {
    if (mode !== menu) setMenu(mode);
    else setMenu('');
  };

  return (
    <>
      <nav data-desktop className='bottom'>
        <Filter desktop toggleFilter={toggleFilter} filter={filter} dispatch={dispatch} />
        <Sort desktop sort={state.sort} dispatch={dispatch} />
        <Settings desktop filter={filter} dispatch={dispatch} />
      </nav>
    </>
  );
}
