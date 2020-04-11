import React, { useState } from 'react';
import ToggleImage from './ToggleImage';

import bug from '../images/inline/bug.svg';
import fish from '../images/inline/fish.svg';
import catchesCheck from '../images/inline/catchesCheck.svg';
import southernHemisphere from '../images/inline/southernHemisphere.svg';
import northernHemisphere from '../images/inline/northernHemisphere.svg';
import bells from '../images/inline/bagOfBells.svg';
import useAppContext, { updateFilter, updateSort } from '../app/context';
import Switcher from './Switcher';

import FilterIcon from '../images/inline/filter.svg';
import SortIcon from '../images/inline/sort.svg';
import SettingsIcon from '../images/inline/settings.svg';
import { AnimatePresence, motion } from 'framer-motion';

const navTrayMotion = {
  initial: { height: 0 },
  animate: { height: 'auto' },
  exit: { height: 0 },
};

const Filter = ({ toggleFilter, filter, dispatch }) => (
  <motion.div {...navTrayMotion}>
    <div className="bottom nav tray">
      <div className="title">Select to show or hide...</div>
      <div className="section">
        <ToggleImage
          Svg={fish}
          label="Fish"
          checked={filter.type?.indexOf('fish') > -1}
          onChange={toggleFilter('fish')}
        />
        <ToggleImage
          Svg={bug}
          label="Bugs"
          checked={filter.type?.indexOf('bug') > -1}
          onChange={toggleFilter('bug')}
        />
        <ToggleImage
          Svg={catchesCheck}
          label="My Catches"
          checked={!filter.caught}
          onChange={() => dispatch(updateFilter({ caught: !filter.caught }))}
        />
      </div>
    </div>
  </motion.div>
);

const Sort = ({ sort, dispatch }) => (
  <motion.div {...navTrayMotion}>
    <div className="bottom nav tray">
      <div className="title">Sort by...</div>
      <div className="section">
        <ToggleImage
          Svg={bells}
          label="Bells"
          checked={sort === 'bells'}
          onChange={() => dispatch(updateSort('bells'))}
        />
        <ToggleImage
          Svg={catchesCheck}
          label="My Catches"
          checked={sort === 'caught'}
          onChange={() => dispatch(updateSort('caught'))}
        />
      </div>
    </div>
  </motion.div>
);

const Settings = ({ filter, dispatch }) => (
  <motion.div {...navTrayMotion}>
    <div className="bottom nav tray">
      <div className="title">Select your Hemisphere</div>
      <div className="section">
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
      <nav data-desktop className="bottom">
        <Filter
          toggleFilter={toggleFilter}
          filter={filter}
          dispatch={dispatch}
        />
        <Sort sort={state.sort} dispatch={dispatch} />
        <Settings filter={filter} dispatch={dispatch} />
      </nav>
      {menu !== '' && <div className="shade" onClick={toggleMenu('')} />}
      <nav data-mobile className="bottom">
        <header>
          {/* <div> */}
          <FilterIcon
            onClick={toggleMenu('filter')}
            className={menu === 'filter' ? 'active' : ''}
          />
          <SortIcon
            onClick={toggleMenu('sort')}
            className={menu === 'sort' ? 'active' : ''}
          />
          <SettingsIcon
            onClick={toggleMenu('settings')}
            className={menu === 'settings' ? 'active' : ''}
          />
        </header>
        <AnimatePresence>
          {menu === 'filter' && (
            <Filter
              toggleFilter={toggleFilter}
              filter={filter}
              dispatch={dispatch}
            />
          )}
          {menu === 'sort' && <Sort sort={state.sort} dispatch={dispatch} />}
          {menu === 'settings' && (
            <Settings filter={filter} dispatch={dispatch} />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
