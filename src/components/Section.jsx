import React from 'react';

export default function Section({ name, children }) {
  return (
    <section>
      <h2>{name}</h2>
      <div className="grid">{children}</div>
    </section>
  );
}
