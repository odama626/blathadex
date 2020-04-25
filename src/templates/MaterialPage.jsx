import { DiyBlock, DiyImage } from 'components/diy/Diy';
import React from 'react';
import BottomNav from '../components/BottomNav/BottomNav';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function MaterialPage({ pageContext }) {
  const { material, recipes } = pageContext;
  const { name } = material;

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
      <BottomNav onFabClick={() => window.history.back()} />
    </Layout>
  );
}
