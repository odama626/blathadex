import React from 'react';
import classnames from 'classnames';
import Checkmark from '../images/inline/checkmark.svg';
import { Link } from 'gatsby';
import { AnimatePresence, motion } from 'framer-motion';
import WarningIcon from '../images/inline/warningIcon.svg';
import { createCritterLink } from '../app/utils';

export const CritterImage = ({ type, name, ...rest }) => (
  <img
    {...rest}
    alt={name}
    src={`/${type}/${name[0]}${name.slice(1).toLowerCase()}.png`}
  />
);

export const CritterBlock = critter => {
  const { name, type, caught, no, leaving } = critter;
  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   key={critter.id}
    // >
    <Link to={createCritterLink(critter)}>
      <div className={classnames('critter block', { caught, leaving })}>
        <div className="stack">
          <CritterImage type={type} name={name} />
          {caught && <Checkmark />}
          {leaving && <WarningIcon className="critter badge" />}
        </div>
      </div>
    </Link>
    // </motion.div>
  );
};

export const CritterCollection = ({
  critters,
  caught,
  splitCaught,
  leaving = [],
}) => {
  let caughtCritters = critters.filter(
    critter =>
      !!caught.find(c => c.type === critter.type && c.no === critter.no)
  );
  let caughtIds = caughtCritters.map(c => c.id);
  let topCritters = critters;

  if (splitCaught) {
    topCritters = critters.filter(critter => !~caughtIds.indexOf(critter.id));
  }

  return (
    <>
      {/* <AnimatePresence> */}
      {topCritters.map(critter => (
        <CritterBlock
          key={critter.id}
          {...critter}
          leaving={!!~leaving.indexOf(critter.id)}
          caught={!splitCaught && !!~caughtIds.indexOf(critter.id)}
        />
      ))}
      {splitCaught &&
        caughtCritters.map(critter => (
          <CritterBlock
            key={critter.id}
            {...critter}
            caught
            leaving={!!~leaving.indexOf(critter.id)}
          />
        ))}
      {/* </AnimatePresence> */}
    </>
  );
};
