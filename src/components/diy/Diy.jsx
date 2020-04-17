import React from 'react';
import { createImgSrc, createDiyLink } from '../../app/utils';
import { Link } from 'gatsby';
import './diy.scss';

export const DiyImage = ({ diy, ...rest }) => (
  <img {...rest} alt={diy.name} src={createImgSrc(diy, true)} />
);

export const DiyBlock = ({ diy }) => {
  return (
    <Link to={createDiyLink(diy)} className="critter block">
      <div className="stack">
        <DiyImage diy={diy} />
      </div>
    </Link>
  );
};
