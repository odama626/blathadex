import { graphql } from 'gatsby';
import orderBy from 'lodash.orderby';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import useAppContext, { updateFilter } from '../app/context';
import db from '../app/database';
import { filterCritters, getCritterSectionGroups, getNearestTimeDiff } from '../app/utils';
import { CritterCollection } from '../components/critters/Critter';
import FilterWidget, { Filter, Sort, Settings } from '../components/FilterWidget';
import Layout from '../components/layout';
import Section from '../components/Section';
import SelectionWidget from '../components/SelectionWidget';
import SEO from '../components/seo';
import Switcher from '../components/Switcher';
import DaySvg from '../images/inline/day.svg';
import MonthSvg from '../images/inline/month.svg';
import BottomNav, { FAB_BUTTON } from 'components/BottomNav/BottomNav';
import FilterIcon from 'images/inline/filter.svg';
import SortIcon from 'images/inline/sort.svg';
import SettingsIcon from 'images/inline/settings.svg';
import { AnimatePresence } from 'framer-motion';
import { useScrollListener } from 'app/hooks';
import SearchOverlay from 'components/Search';

export default function IndexPageContainer(props) {
  const availableCritters = useMemo(() => props.data.allCrittersJson.edges.map(edge => edge.node), [
    props.data.allCrittersJson.edges,
  ]);

  const [state] = useAppContext();
  const sort = state.sort;
  const hemisphere = state?.filter?.hemisphere;

  const sortedCritters = useMemo(
    () => orderBy(availableCritters, [sort, 'bells'], ['desc', 'desc']),
    [sort, availableCritters]
  );

  const initialGroups = useMemo(() => getCritterSectionGroups(sortedCritters, hemisphere), [
    sortedCritters,
    hemisphere,
  ]);

  const [groups, setGroups] = useState(initialGroups);

  useEffect(() => setGroups(initialGroups), [initialGroups]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setGroups(getCritterSectionGroups(sortedCritters, hemisphere));
    }, getNearestTimeDiff());

    return () => {
      clearTimeout(timer);
    };
  }, [groups, hemisphere, sortedCritters]);

  return <IndexPage sectionGroups={groups} critters={sortedCritters} />;
}

function IndexPage({ sectionGroups, critters }) {
  const [menu, setMenu] = useState('');
  const [state, dispatch] = useAppContext();

  const toggleMenu = mode => () => {
    if (mode !== menu) setMenu(mode);
    else setMenu('');
  };
  const toggleFilter = value => checked => {
    let type = (filter.type || []).filter(f => f !== value);
    if (checked) type.push(value);
    dispatch(updateFilter({ type }));
  };

  useScrollListener(({ delta }) => menu !== 'search' && delta > 0 && setMenu(''));

  const today = state?.filter?.today;

  const rawSections = useMemo(() => (today ? sectionGroups.days : sectionGroups.months), [
    sectionGroups,
    today,
  ]);
  const filter = state.filter;
  const [loading, setLoading] = useState(true);

  const [caught, setCaught] = useState([]);

  useLayoutEffect(() => {
    db.caught
      .toArray()
      .then(setCaught)
      .then(() => setLoading(false));
  }, []);

  const sections = useMemo(() => {
    return rawSections.map(section => ({
      ...section,
      critters: filterCritters(section.critters, caught, filter),
    }));
  }, [filter, caught, loading, rawSections]);

  const handleMultiSelect = ids => {
    let newCaught = ids.map(id => {
      let { type, no } = critters.find(c => c.id === id);
      return { type, no };
    });
    db.caught.bulkPut(newCaught);
    setCaught([...caught, ...newCaught]);
  };

  return (
    <Layout
      actions={
        <div>
          <Switcher
            options={[
              { value: 'day', label: 'Day', Svg: DaySvg },
              { value: 'month', label: 'Month', Svg: MonthSvg },
            ]}
            value={filter.today ? 'day' : 'month'}
            onChange={value => dispatch(updateFilter({ today: value === 'day' }))}
          />
        </div>
      }
      navBar={<></>}
    >
      <SEO title='Blathadex' />
      {menu !== '' && <div className='shade' onClick={toggleMenu('')} />}
      {menu === 'search' && <SearchOverlay attached showResults />}
      <FilterWidget />
      <BottomNav
        collapse={menu === 'search'}
        onFabClick={menu === 'search' ? toggleMenu('') : toggleMenu('search')}
        fabIconPath={menu === 'search' ? FAB_BUTTON.BACK : FAB_BUTTON.SEARCH}
        actions={
          <div
            style={{
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: 'repeat(5, 1fr)',
              alignItems: 'center',
              justifyItems: 'center',
              alignSelf: 'flex-start',
              marginTop: '1em',
            }}
          >
            <FilterIcon
              onClick={toggleMenu('filter')}
              className={menu === 'filter' ? 'active' : ''}
            />
            <SortIcon onClick={toggleMenu('sort')} className={menu === 'sort' ? 'active' : ''} />
            <SettingsIcon
              onClick={toggleMenu('settings')}
              className={menu === 'settings' ? 'active' : ''}
            />
          </div>
        }
      >
        <AnimatePresence>
          {menu === 'filter' && (
            <Filter toggleFilter={toggleFilter} filter={filter} dispatch={dispatch} />
          )}
          {menu === 'sort' && <Sort sort={state.sort} dispatch={dispatch} />}
          {menu === 'settings' && <Settings filter={filter} dispatch={dispatch} />}
        </AnimatePresence>
      </BottomNav>
      <SelectionWidget onSelect={handleMultiSelect} />
      {sections
        .filter(s => s.critters.length)
        .map((section, i) => (
          <Section name={section.section} key={i}>
            <CritterCollection
              multiSelect
              critters={section.critters}
              leaving={section.leaving}
              caught={caught}
              splitCaught={state.sort === 'caught'}
            />
          </Section>
        ))}
    </Layout>
  );
}

export const query = graphql`
  query AllCritter {
    allCrittersJson {
      edges {
        node {
          bells
          name
          no
          id
          etime
          etime2
          smonth
          smonth2
          stime
          stime2
          type
          size
          loc
          emonth2
          emonth
          desc
          shadow
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
