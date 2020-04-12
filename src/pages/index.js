import { graphql } from 'gatsby';
import orderBy from 'lodash.orderby';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import useAppContext, { updateFilter } from '../app/context';
import db from '../app/database';
import { filterCritters, getCritterSections } from '../app/utils';
import { CritterCollection } from '../components/Critter';
import FilterWidget from '../components/FilterWidget';
import Layout from '../components/layout';
import Section from '../components/Section';
import SEO from '../components/seo';
import Switcher from '../components/Switcher';
import DaySvg from '../images/inline/day.svg';
import MonthSvg from '../images/inline/month.svg';
import SelectionWidget from '../components/SelectionWidget';

export default function IndexPage(props) {
  const availableCritters = useMemo(
    () => props.data.allCrittersJson.edges.map(edge => edge.node),
    []
  );

  const [state, dispatch] = useAppContext();
  const sortedCritters = useMemo(
    () => orderBy(availableCritters, [state.sort, 'bells'], ['desc', 'desc']),
    [state.sort, availableCritters]
  );
  const filter = state.filter;
  const [loading, setLoading] = useState(true);

  const [caught, setCaught] = useState([]);
  const [sections, setSections] = useState([]);

  useLayoutEffect(() => {
    db.caught
      .toArray()
      .then(setCaught)
      .then(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    if (loading) return;
    setSections(
      getCritterSections(filterCritters(sortedCritters, caught, filter), state)
    );
  }, [filter, caught, loading]);

  const handleMultiSelect = ids => {
    let newCaught = ids.map(id => {
      let { type, no } = availableCritters.find(c => c.id === id);
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
