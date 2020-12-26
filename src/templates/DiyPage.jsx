import { DiyBlock, DiyImage } from 'components/diy/Diy';
import { Link, navigate, withPrefix } from 'gatsby';
import Pattern from 'images/inline/pattern.svg';
import React, { Fragment, useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav/BottomNav';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { createImgSrc, capitalize } from '../app/utils';
import ToDiyButton from 'images/inline/ToDiyButton.svg';
import { motion } from 'framer-motion';
import Bells from 'images/inline/bagOfBells.svg';
import Checkbox from 'components/Checkbox';
import db from 'app/database';
import LocationIcon from 'images/inline/locationIcon.svg';

const ObjectSizeImage = ({ size, ...rest }) => {
  return <img {...rest} alt={size} src={createImgSrc({ type: 'object_size', name: size }, true)} />;
};

export default function DiyPage({ pageContext }) {
  const { diy, similar } = pageContext;
  const { name } = diy;

  const [collected, setCollected] = useState(false);

  useEffect(() => {
    db.collected.get({ name }).then(r => setCollected(!!r));
  }, [name]);

  const handleChange = checked => {
    if (checked) {
      db.collected.put({ name });
    } else {
      db.collected.where({ name }).delete();
    }
    setCollected(checked);
  };

  const additionalRecipes = diy.materialsNeeded.filter(i => i.type === 'diy');

  return (
    <Layout>
      <SEO title={name} />
      <article>
        <section style={{ position: 'relative', zIndex: 0, overflow: 'hidden' }}>
          <h1>{name}</h1>
          <h2 style={{ color: 'var(--secondary)' }}>{diy.obtainedFrom}</h2>
          <div
            className='stack'
            style={{
              padding: '2em',
              overflow: 'hidden',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--section-shadow)',
            }}
          >
            <DiyImage diy={diy} />
            <Pattern style={{ padding: 0, zIndex: -1 }} />
          </div>
          <br />
          <div className='detail grid'>
            <Bells />
            <h3 style={{ marginBottom: 0 }}>{(diy.itemSellPrice || 0).toLocaleString()}</h3>
            <Checkbox
              style={{ justifySelf: 'flex-end' }}
              checked={collected}
              label='Collected'
              onChange={handleChange}
            />
            {diy.obtainedFrom.length > 0 && (
              <>
                <LocationIcon />
                {[diy.obtainedFrom].map((place, i) => (
                  <span key={i} style={{ gridColumn: '2 / 4' }}>
                    {place}
                  </span>
                ))}{' '}
              </>
            )}
          </div>
        </section>
        <section>
          <div className='detail grid'>
            <h3
              style={{
                gridColumn: '1 / 3',
                justifySelf: 'flex-start',
                margin: 0,
                textAlign: 'left',
              }}
            >
              Total Ingredients
            </h3>
            <h3 style={{ margin: 0, justifySelf: 'flex-start' }}>Space</h3>
            {diy.materialsNeeded
              .filter(i => i.type === 'material')
              .map((material, i) => (
                <Fragment key={i}>
                  <div className='block primary' style={{ gridColumn: '1', placeSelf: 'center' }}>
                    {material.count}
                  </div>
                  <Link
                    to={material.link}
                    style={{
                      gridColumn: '2',
                      placeSelf: 'center flex-start',
                      textAlign: 'left',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span>{capitalize(material.ingredient)}</span>
                    <DiyImage
                      style={{ height: '35px' }}
                      diy={{ name: capitalize(material.ingredient), type: material.type }}
                    />
                  </Link>
                </Fragment>
              ))}
            {diy.size && (
              <ObjectSizeImage
                size={diy.size}
                style={{
                  height: '95px',
                  gridColumn: '3',
                  gridRow: '2 / 4',
                  justifySelf: 'flex-start',
                }}
              />
            )}
          </div>
        </section>
        {additionalRecipes.length > 0 && (
          <section>
            <h3>Additional Recipes Needed</h3>
            {additionalRecipes.map((recipe, i) => (
              <Link to={recipe.link} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>{recipe.name}</h1>
                <h2 style={{ color: 'var(--secondary)' }}>{recipe.obtainedFrom}</h2>
                <div
                  className='stack'
                  style={{
                    padding: '2em',
                    overflow: 'hidden',
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'var(--section-shadow)',
                  }}
                >
                  <DiyImage diy={recipe} />
                  <Pattern style={{ padding: 0, zIndex: -1 }} />
                </div>
              </Link>
            ))}
          </section>
        )}
        <section>
          <h3>Similar Recipes</h3>
          <div className='grid'>
            {similar.map(diy => (
              <DiyBlock diy={diy} key={diy.id} />
            ))}
          </div>
        </section>
      </article>
      <BottomNav
        onFabClick={() => window.history.back()}
        overhangActions
        actions={
          <motion.div whileTap={{ scale: 0.8 }}>
            <ToDiyButton onClick={() => navigate('/diy')} />
          </motion.div>
        }
      ></BottomNav>
    </Layout>
  );
}
