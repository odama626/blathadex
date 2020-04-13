import { graphql } from 'gatsby';
import orderBy from 'lodash.orderby';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import useAppContext, { updateFilter } from '../app/context';
import db from '../app/database';
import {
  filterCritters,
  getCritterSectionGroups,
  getNearestTimeDiff,
} from '../app/utils';
import { CritterCollection } from '../components/Critter';
import FilterWidget from '../components/FilterWidget';
import Layout from '../components/layout';
import Section from '../components/Section';
import SelectionWidget from '../components/SelectionWidget';
import SEO from '../components/seo';
import Switcher from '../components/Switcher';
import DaySvg from '../images/inline/day.svg';
import MonthSvg from '../images/inline/month.svg';

export default function IndexPageContainer(props) {
  console.time('render');
  const availableCritters = useMemo(
    () => props.data.allCrittersJson.edges.map(edge => edge.node),
    [props.data.allCrittersJson.edges]
  );

  const [state] = useAppContext();
  const sort = state.sort;
  const hemisphere = state?.filter?.hemisphere;
  const sortedCritters = useMemo(
    () => orderBy(availableCritters, [sort, 'bells'], ['desc', 'desc']),
    [sort, availableCritters]
  );

  const initialGroups = useMemo(
    () => getCritterSectionGroups(sortedCritters, hemisphere),
    [sortedCritters, hemisphere]
  );

  const [groups, setGroups] = useState(initialGroups);

  useEffect(() => {
    console.log(' effect');
    let timer = setTimeout(() => {
      setGroups(getCritterSectionGroups(sortedCritters, hemisphere));
    }, getNearestTimeDiff());

    return () => {
      clearTimeout(timer);
    };
  }, [groups, hemisphere, sortedCritters]);

  console.timeEnd('render');
  return <IndexPage sectionGroups={groups} critters={sortedCritters} />;
}

function IndexPage({ sectionGroups, critters }) {
  const [state, dispatch] = useAppContext();

  const today = state?.filter?.today;

  const rawSections = useMemo(
    () => (today ? sectionGroups.days : sectionGroups.months),
    [sectionGroups, today]
  );
  const filter = state.filter;
  const [loading, setLoading] = useState(true);

  const [caught, setCaught] = useState([]);
  const [sections, setSections] = useState(rawSections);

  useLayoutEffect(() => {
    db.caught
      .toArray()
      .then(setCaught)
      .then(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    if (loading) return;
    setSections(
      rawSections.map(section => ({
        ...section,
        critters: filterCritters(section.critters, caught, filter),
      }))
    );
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
            onChange={value =>
              dispatch(updateFilter({ today: value === 'day' }))
            }
          />
        </div>
      }
      navBar={<></>}
    >
      <SEO title="Blathadex" />
      <FilterWidget />
      <SelectionWidget onSelect={handleMultiSelect} />
      {sections
        .filter(s => s.critters.length)
        .map((section, i) => (
          <Section name={section.section} key={i}>
            <CritterCollection
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
        }
      }
    }
  }
`;
