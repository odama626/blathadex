import React, { useState } from 'react';
import { createImgSrc, createItemLink } from 'app/utils';
import { Link } from 'gatsby';
import './diy.scss';
import diy404Src from 'images/diy404.svg';

export const DiyImage = ({ diy, ...rest }) => {
  const [src, setSrc] = useState(createImgSrc(diy, true));

  return <img {...rest} onError={() => setSrc(diy404Src)} alt={diy.name} src={src} />;
};

export const DiyBlock = ({ diy }) => {
  return (
    <Link to={createItemLink(diy)} className='critter block'>
      <div className='stack'>
        <DiyImage diy={diy} />
      </div>
    </Link>
  );
};
