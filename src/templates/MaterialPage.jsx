import { DiyBlock, DiyImage } from 'components/diy/Diy';
import { AnimatePresence, motion } from 'framer-motion';
import BackButton from 'images/inline/back.svg';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Pattern from 'images/inline/pattern.svg';

export default function DiyPage({ pageContext }) {
  const { material, recipes } = pageContext;
  const { name } = material;

  // console.log({ diy });

  return (
    <Layout>
      <SEO title={`${name} | material`} />
      <article>
        <section
          style={{ position: 'relative', zIndex: 0, overflow: 'hidden' }}
        >
          <h1>{name}</h1>
          <DiyImage diy={material} />
          <h3>Obtained from</h3>
          {material.obtainedFrom.map(x => (
            <p>{x}</p>
          ))}
          <p>{(+material.bells || 0).toLocaleString()} bells</p>
        </section>
        <section>
          <h3>Used in Recipes</h3>
          <div className="grid">
            {recipes.map(diy => (
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
