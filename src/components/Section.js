import React from 'react';

const Section = ({ id, className, children }) => (
  <section id={id} className={`py-16 ${className || ''}`}>
    <div className="container mx-auto px-4">
      {children}
    </div>
  </section>
);

export default Section;