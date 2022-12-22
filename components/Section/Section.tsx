type SectionProps = {
  type: 'about' | 'work' | 'contact';
  title: string;
  children?: any;
};

const Section = ({ title, type, children }: SectionProps) => (
  <section className={`section section-${type}`}>
    <h2>{title}</h2>
    {children}
  </section>
);

export default Section;
