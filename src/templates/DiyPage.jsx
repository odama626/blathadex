import { DiyBlock, DiyImage } from 'components/diy/Diy';
import { AnimatePresence, motion } from 'framer-motion';
import BackButton from 'images/inline/back.svg';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Pattern from 'images/inline/pattern.svg';
import { Link } from 'gatsby';

export default function DiyPage({ pageContext }) {
  const { diy, similar } = pageContext;
  const { name } = diy;

  return (
    <Layout>
      <SEO title={name} />
      <article>
        <section
          style={{ position: 'relative', zIndex: 0, overflow: 'hidden' }}
        >
          <h1>{name}</h1>
          <Pattern
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}
          />
          <DiyImage diy={diy} />
          <h2>Materials Needed</h2>
          {diy.materialsNeeded.map(material => (
            <p>
              <Link to={material.link}>
                {material.count}x {material.ingredient}
              </Link>
            </p>
          ))}
        </section>
        <section>
          <h3>Similar Recipes</h3>
          <div className="grid">
            {similar.map(diy => (
              <DiyBlock diy={diy} />
            ))}
          </div>
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
              onClick={() => window.history.back()}
            >
              <BackButton />
            </motion.div>
          </AnimatePresence>
        </div>
      </nav>
    </Layout>
  );
}
