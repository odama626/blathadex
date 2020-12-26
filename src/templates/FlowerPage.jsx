import { DiyBlock, DiyImage } from 'components/diy/Diy';
import React, { useEffect, useState } from 'react';
import BottomNav from 'components/BottomNav/BottomNav';
import Layout from 'components/layout';
import SEO from 'components/seo';
import ItemBlock from 'components/ItemBlock';
import Bells from 'images/inline/bagOfBells.svg';
import LocationIcon from 'images/inline/locationIcon.svg';
import Checkbox from 'components/Checkbox';
import db from 'app/database';
import { motion } from 'framer-motion';
import { navigate } from 'gatsby';
import ToFlowersButton from 'images/inline/toFlowersButton.svg';

function mockMixItem(flower, mix) {
  let name = `${mix.color} ${flower.name.split(' ').slice(-1)[0]}`
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
  return {
    name,
    type: 'flower',
    hybrid: mix.hybrid,
  };
}

export default function MaterialPage({ pageContext }) {
  const { flower, recipes, similar } = pageContext;
  const { name, genus, color } = flower;
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    db.grown.get({ genus, color }).then(r => setGrown(!!r));
  }, [genus, color]);

  const handleChange = checked => {
    if (checked) {
      db.grown.put({ genus, color });
    } else {
      db.grown.where({ genus, color }).delete();
    }
    setGrown(checked);
  };

  return (
    <Layout>
      <SEO title={`${name} | Flower`} />
      <article>
        <section style={{ position: 'relative', zIndex: 0, overflow: 'hidden' }}>
          <h1>{name}</h1>
          <DiyImage diy={flower} />
          <div className='detail grid'>
            <Bells />
            <h3 style={{ marginBottom: 0 }}>{(+flower.bells || 0).toLocaleString()}</h3>
            <Checkbox
              style={{ justifySelf: 'flex-end' }}
              checked={grown}
              onChange={handleChange}
              label='Grown'
            />
            {flower.obtainedFrom.length > 0 && (
              <>
                <LocationIcon />
                {flower.obtainedFrom.map(place => (
                  <span style={{ gridColumn: '2 / 4' }}>{place}</span>
                ))}{' '}
              </>
            )}
          </div>
        </section>
        {flower.mixes.length > 0 && (
          <section>
            <h3>Flowers needed for crossbreeding</h3>
            {flower.mixes.map((mix, i) => (
              <>
                <div className='grid'>
                  <ItemBlock showName item={mockMixItem(flower, mix.a)} />
                  <ItemBlock showName item={mockMixItem(flower, mix.b)} />
                </div>
                <br />
                {i !== flower.mixes.length - 1 && <h3>Or</h3>}
              </>
            ))}
          </section>
        )}
        <section>
          <h3>Used in Recipes</h3>
          <div className='grid'>
            {recipes.map(diy => (
              <DiyBlock diy={diy} />
            ))}
          </div>
        </section>
        <section>
          <h3>Similar</h3>
          <div className='grid'>
            {similar.map(diy => (
              <DiyBlock diy={diy} />
            ))}
          </div>
        </section>
      </article>
      <BottomNav
        onFabClick={() => window.history.back()}
        overhangActions
        actions={
          <motion.div whileTap={{ scale: 0.8 }}>
            <ToFlowersButton onClick={() => navigate('/flowers')} />
          </motion.div>
        }
      ></BottomNav>
    </Layout>
  );
}
