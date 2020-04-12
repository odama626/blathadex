import classnames from 'classnames';
import { navigate } from 'gatsby';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import db from '../app/database';
import { isCritterAvailableInMonth } from '../app/utils';
import Checkbox from '../components/Checkbox';
import { CritterImage } from '../components/Critter';
import { HourRange, MonthRange } from '../components/DateRange';
import Layout from '../components/layout';
import Bells from '../images/inline/bagOfBells.svg';
import BackButton from '../images/inline/back.svg';
import WarningIcon from '../images/inline/warningIcon.svg';
import SEO from '../components/seo';
import { AnimatePresence, motion } from 'framer-motion';

export default function CritterPage({ pageContext }) {
  const { critter } = pageContext;
  const { name, desc, bells, type, no, loc } = critter;
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
          <p>{desc}</p>
        </section>
        <section>
          <h3 style={{ marginTop: '16px' }}>Dates Available</h3>
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
        </section>
      </article>
      <nav data-mobile className="bottom">
        <div className="bottom nav menu">
          <AnimatePresence>
            <motion.div
              initial={{ x: '-50%', y: '-70%', scale: 0.01 }}
              animate={{ x: '-50%', y: '-70%', scale: 1 }}
              exit={{ x: '-50%', y: '-70%', scale: 0.01 }}
              whileTap={{ scale: 0.8 }}
              className="nav fab"
              onClick={() => navigate('/')}
            >
              <BackButton />
            </motion.div>
          </AnimatePresence>
        </div>
      </nav>
    </Layout>
  );
}
