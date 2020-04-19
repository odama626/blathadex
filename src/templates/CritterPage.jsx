import classnames from 'classnames';
import Bells from 'images/inline/bagOfBells.svg';
import WarningIcon from 'images/inline/warningIcon.svg';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import db from '../app/database';
import { capitalize, isCritterAvailableInMonth } from '../app/utils';
import BottomNav from '../components/BottomNav';
import Checkbox from '../components/Checkbox';
import { CritterImage } from '../components/critters/Critter';
import { HourRange, MonthRange } from '../components/DateRange';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function CritterPage({ pageContext }) {
  const { critter } = pageContext;
  const { name, desc, bells, type, no, loc, rarity, quote } = critter;
  const [caught, setCaught] = useState(false);

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

  let date = DateTime.local();
  let has = isCritterAvailableInMonth(date, critter);
  let nextMonth = isCritterAvailableInMonth(date.plus({ months: 1 }), critter);
  let warning = has && !nextMonth;

  return (
    <Layout>
      <SEO title={name} description={desc} />
      <article className={classnames('critter detail', { warning })}>
        {warning && (
          <div className="banner warning">This catch is about to get away!</div>
        )}
        <section>
          <h1 style={{ marginBottom: '0.5em', marginTop: '16px' }}>
            {warning && <WarningIcon />} {name}
          </h1>
          <CritterImage
            style={{ width: '100%', height: '300px', objectFit: 'contain' }}
            {...critter}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1.45em',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Bells
                  style={{ height: '28px', width: '28px', marginRight: '6px' }}
                />
                <h3 style={{ marginBottom: '0' }}>
                  {(bells || 0).toLocaleString()}
                </h3>
              </div>
            </div>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Checkbox
                checked={caught}
                onChange={handleChange}
                label="Mark as Caught"
              />
            </div>
          </div>
          <p>
            Location:{' '}
            <span style={{ color: 'var(--calendar-accent)' }}>{loc}</span>
          </p>
          {rarity && (
            <p>
              Rarity:{' '}
              <span style={{ color: 'var(--calendar-accent' }}>
                {capitalize(rarity)}
              </span>
            </p>
          )}
          {caught && quote && (
            <blockquote>
              <h3>
                <i>{quote}</i>
              </h3>
            </blockquote>
          )}
          <p>{desc}</p>
        </section>
        <section>
          <h3 style={{ marginTop: '16px' }}>Availability</h3>
          <div className="date container">
            <MonthRange
              ranges={[
                [critter.smonth, critter.emonth],
                [critter.smonth2, critter.emonth2],
              ]}
            />
            <HourRange
              ranges={[
                [critter.stime, critter.etime],
                [critter.stime2, critter.etime2],
              ]}
            />
          </div>
        </section>
      </article>
      <BottomNav onFabClick={() => window.history.back()} />
    </Layout>
  );
}
