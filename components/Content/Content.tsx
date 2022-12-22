import Section from '../Section/Section';
import ContactLinks from '../ContactLinks/ContactLinks';

const Content = () => (
  <div className="content">
    <Section type="about" title="Hello there">
      <p>
        I&apos;m a <strong>Software Engineer</strong> and a proud father to an
        Australian Kelpie named Jpeg. Professionally, I&apos;ve worn many hats such
        as <strong>Software Engineer</strong>, <strong>Consultant</strong>,{' '}
        <strong>Manager</strong>, and <strong>Technical Director</strong>. At my
        last few gigs, I managed technical teams at companies like{' '}
        <strong>Dropbox</strong> and <strong>Spredfast</strong> (now known as
        Khoros). Currently, I&apos;m a Senior Software Engineer working on something
        pretty special at a scaleup called <strong>AllStripes</strong>. We&apos;re
        building an amazing, modern platform to advance rare disease research.
      </p>
      <p>
        I enjoy writing <strong>Typescript</strong> but also dabble in{' '}
        <strong>Golang</strong>. Outside of the 9 to 5, you can catch me hosting
        whiskey tasting events, going on a run around Lady Bird Lake in downtown
        Austin, Texas, or spending some quality time with my wonderful{' '}
        <span className="strike-through">girlfriend</span>{' '}
        <span className="strike-through">fiancé</span> wife and our beautiful
        daughter.
      </p>
    </Section>

    <Section type="contact" title="Get in touch">
      <p>
        From time to time, I consult on large-scale fullstack Typescript
        codebases, especially ones using <strong>Node.js</strong> and <strong>React</strong>. If you&apos;d like to
        work with me, give me a shout.
      </p>
      <ContactLinks />
    </Section>
  </div>
);

export default Content;
