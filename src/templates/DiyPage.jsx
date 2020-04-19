import { DiyBlock, DiyImage } from 'components/diy/Diy';
import { Link } from 'gatsby';
import Pattern from 'images/inline/pattern.svg';
import React from 'react';
import BottomNav from '../components/BottomNav';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { createImgSrc } from '../app/utils';

const ObjectSizeImage = ({ size, ...rest }) => {
  return (
    <img
      {...rest}
      alt={size}
      src={createImgSrc({ type: 'object_size', name: size }, true)}
    />
  );
};

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
          <div
            className="stack"
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
          <h2 style={{ marginTop: '1em' }}>Materials Needed</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            <div>
              {diy.materialsNeeded.map(material => (
                <p style={{ textAlign: 'start' }}>
                  <Link to={material.link}>
                    {material.count}x {material.ingredient}
                  </Link>
                </p>
              ))}
            </div>
            {diy.size && (
              <div>
                <ObjectSizeImage size={diy.size} />
              </div>
            )}
          </div>
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
