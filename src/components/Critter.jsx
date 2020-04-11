import classnames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { createCritterImageSrc, createCritterLink } from '../app/utils';
import Checkmark from '../images/inline/checkmark.svg';
import WarningIcon from '../images/inline/warningIcon.svg';

export const CritterImage = ({ type, name, ...rest }) => (
  <img {...rest} alt={name} src={createCritterImageSrc({ type, name })} />
);

export const CritterBlock = critter => {
  const { name, type, caught, no, leaving } = critter;
  return (
    <Link to={createCritterLink(critter)}>
      <div className={classnames('critter block', { caught, leaving })}>
        <div className="stack">
          <CritterImage type={type} name={name} />
          {caught && <Checkmark />}
          {leaving && <WarningIcon className="critter badge" />}
        </div>
      </div>
    </Link>
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
    </>
  );
};
