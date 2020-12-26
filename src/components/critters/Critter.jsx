import classnames from 'classnames';
import { navigate } from 'gatsby';
import React, { useCallback } from 'react';
import { useSelectedContext } from 'app/context';
import { createImgSrc, createCritterLink } from 'app/utils';
import Checkmark from 'images/inline/checkmark.svg';
import WarningIcon from 'images/inline/warningIcon.svg';
import { useLongPressable } from '../LongPressableDiv';
import './critter.scss';

export const CritterImage = ({ type, name, ...rest }) => (
  <img {...rest} alt={name} src={createImgSrc({ type, name })} />
);

export const CritterBlock = critter => {
  const { name, type, caught, leaving, allowSelect } = critter;
  const { selected, toggle } = useSelectedContext();

  const handleClick = useCallback(
    e => {
      if (!selected.length) {
        navigate(createCritterLink(critter));
      } else {
        toggle(critter);
      }
    },
    [selected.length, critter, toggle]
  );

  const lpProps = useLongPressable({
    onClick: handleClick,
    onLongPress: () => allowSelect && toggle(critter),
  });

  return (
    <button
      {...lpProps}
      data-selected={!!~selected.indexOf(critter.id)}
      className={classnames('critter block', { caught, leaving })}
    >
      <div className='stack'>
        <CritterImage type={type} name={name} />
        {caught && <Checkmark className='badge bottom left' />}
        {leaving && <WarningIcon className='badge top right overhang' />}
      </div>
    </button>
  );
};

export const CritterCollection = ({
  critters = [],
  caught,
  splitCaught,
  multiSelect,
  leaving = [],
}) => {
  let caughtCritters = !caught
    ? []
    : critters.filter(
        (critter = {}) => !!caught.find(c => c.type === critter.type && c.no === critter.no)
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
          allowSelect={multiSelect}
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
