import classnames from 'classnames';
import Bells from 'images/inline/bagOfBells.svg';
import WarningIcon from 'images/inline/warningIcon.svg';
import LocationIcon from 'images/inline/locationIcon.svg';
import { DateTime } from 'luxon';
import React, { useEffect, useState, useMemo } from 'react';
import db from 'app/database';
import { capitalize, isCritterAvailableInMonth } from 'app/utils';
import BottomNav from 'components/BottomNav/BottomNav';
import Checkbox from 'components/Checkbox';
import { CritterImage, CritterCollection } from 'components/critters/Critter';
import { HourRange, MonthRange } from 'components/DateRange';
import Layout from 'components/layout';
import SEO from 'components/seo';
import Section from 'components/Section';
import sortby from 'lodash.orderby';
import { getCritterLocation } from 'app/node-shared';
import RarityIcon from 'images/inline/rarityIcon.svg';
import QuoteBefore from 'images/inline/quoteBefore.svg';
import QuoteAfter from 'images/inline/quoteAfter.svg';
import useAppContext from 'app/context';

function pluralize(word) {
  if (word.toLowerCase() === 'fish') return word;
  return word + 's';
}


function getSize(shadow) {
  switch (shadow) {
    case 'tiny':
    case '1':
    case 'smallest':
      return { size: 1 };

    case 'small':
    case '2':
      return { size: 2 };

    case 'medium':
    case '3':
      return { size: 3 };

    case 'large, medium':
    case '4':
      return { size: 4 };
    case 'medium-large with fin':
      return { size: 4, fin: true };

    case 'large':
    case '5':
      return { size: 5 };

    case 'very large':
    case 'huge':
      return { size: 6 };
    case 'huge (with fin)':
      return { size: 6, fin: true };

    default:
      return { size: 0 };
  }
}

function ShadowImage({ size }) {
  const Component = require(`images/inline/fins/${['size', size.size, size.fin ? 'fin' : null]
    .filter(Boolean)
    .join('-')}.svg`);

  return <Component />;
}

export default function CritterPage({ pageContext }) {
  const { critter, similar = [] } = pageContext;
  const { name, desc, bells, type, no, loc, rarity, quote, shadow } = critter;
  const [caught, setCaught] = useState(false);
  let date = DateTime.local();
  let has = isCritterAvailableInMonth(date, critter);
  let nextMonth = isCritterAvailableInMonth(date.plus({ months: 1 }), critter);
  let warning = has && !nextMonth;
  const [{ filter }] = useAppContext();
  console.log({ filter });

  useEffect(() => {
    db.caught.get({ type, no }).then(result => setCaught(!!result));
  }, [type, no]);

  const handleChange = checked => {
    if (checked) {
      db.caught.put({ type, no });
    } else {
      db.caught.where({ type, no }).delete();
    }
    setCaught(checked);
  };

  const similarCritters = useMemo(
    () =>
      sortby(
        similar.filter(c => c.id !== critter.id && isCritterAvailableInMonth(DateTime.local(), c)),
        ['bells'],
        ['desc']
      ),
    [critter, similar, date.hour]
  );

  const size = getSize(shadow);

  return (
    <Layout>
      <SEO title={name} description={desc} />
      <article className={classnames('critter detail', { warning })}>
        {warning && <div className='banner warning'>This catch is about to get away!</div>}
        <section>
          <h1 style={{ marginBottom: '0.5em', marginTop: '16px' }}>
            {warning && <WarningIcon />} {name}
          </h1>
          <CritterImage
            style={{ width: '100%', height: '300px', objectFit: 'contain' }}
            {...critter}
          />
          <div className='detail grid'>
            <Bells />
            <h3 style={{ marginBottom: '0' }}>{(bells || 0).toLocaleString()}</h3>
            <Checkbox
              style={{ justifySelf: 'flex-end' }}
              checked={caught}
              onChange={handleChange}
              label='Caught'
            />
            <LocationIcon />
            <span style={{ color: 'var(--calendar-accent)' }}>{loc}</span>
          </div>
        </section>
        {type === 'fish' && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>
                Size {size.size ? size.size : 'Unknown'} {size.fin ? 'with fin' : null}
              </h3>
              <ShadowImage size={size} />
            </div>
          </section>
        )}
        {caught && quote && (
          <section className='quote'>
            <QuoteBefore style={{ float: 'left' }} />
            <h3 style={{ margin: 0 }}>
              <i>{quote}</i>
            </h3>
            <QuoteAfter style={{ float: 'right' }} />
          </section>
        )}
        <section>
          {rarity && (
            <div className='detail grid'>
              <RarityIcon />
              <h3 style={{ margin: 0 }}>{capitalize(rarity)}</h3>
            </div>
          )}

          <p>{desc}</p>
        </section>
        <section>
          <h3 style={{ marginTop: '16px', textAlign: 'left' }}>Availability</h3>
          <div className='date container'>
            <HourRange
              ranges={[
                [critter.stime, critter.etime],
                [critter.stime2, critter.etime2],
              ]}
            />
          </div>
        </section>
        <section>
          <h3 style={{ marginTop: '16px', textAlign: 'start' }}>{capitalize(filter.hemisphere)} Seasonality</h3>
          <div className='date container'>
            <MonthRange
              hemisphere={filter.hemisphere}
              ranges={[
                [critter.smonth, critter.emonth],
                [critter.smonth2, critter.emonth2],
              ]}
            />
          </div>
        </section>
        {similarCritters.length > 0 && (
          <Section
            name={`Other ${capitalize(getCritterLocation(critter.loc))} ${pluralize(
              critter.type
            )} this month`}
          >
            <CritterCollection critters={similarCritters} />
          </Section>
        )}
      </article>
      <BottomNav onFabClick={() => window.history.back()} />
    </Layout>
  );
}
