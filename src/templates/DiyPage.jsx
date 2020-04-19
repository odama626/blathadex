import { DiyBlock, DiyImage } from 'components/diy/Diy';
import { AnimatePresence, motion } from 'framer-motion';
import BackButton from 'images/inline/back.svg';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Pattern from 'images/inline/pattern.svg';
import { Link } from 'gatsby';
import BottomNav from '../components/BottomNav';

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
          <h2 style={{ color: 'var(--secondary)' }}>{diy.obtainedFrom}</h2>
          <div className="stack" style={{ padding: '2em' }}>
            <DiyImage diy={diy} />
            <Pattern style={{ padding: 0, zIndex: -1 }} />
          </div>
          <h2 style={{ marginTop: '1em' }}>Materials Needed</h2>
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
      <BottomNav onFabClick={() => window.history.back()} />
    </Layout>
  );
}
