import { createCritterLink, createImgSrc, createItemLink } from 'app/utils';
import { Link } from 'gatsby';
import diy404Src from 'images/diy404.svg';
import React, { useState } from 'react';
import HybridStar from 'images/inline/hybridStar.svg';

function createLink(item) {
  if (~['bug', 'fish'].indexOf(item.type)) {
    return createCritterLink(item);
  }
  return createItemLink(item);
}

function Image({ item, ...rest }) {
  const asIs = !~['bug', 'fish'].indexOf(item.type);
  const [src, setSrc] = useState(createImgSrc(item, asIs));
  return <img {...rest} alt={item.name} src={src} onError={() => setSrc(diy404Src)} />;
}

export default function Block({ item, showName }) {
  return (
    <Link to={createLink(item)} style={{ textDecoration: 'none' }}>
      <div className='critter block'>
        <div className='stack'>
          <Image item={item} />
          {item.hybrid && <HybridStar className='badge top right' />}
        </div>
      </div>
      {showName && <h4 style={{ margin: '1em 0' }}>{item.name}</h4>}
    </Link>
  );
}
