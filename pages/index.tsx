import { NextPage } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Layout from '../components/Layout/Layout';
import Section from '../components/Section/Section';

const mainFont = Bricolage_Grotesque({ subsets: ['latin'] });
const monoFont = JetBrains_Mono({ subsets: ['latin'] });

export default function Index() {
  return (
    <>
      <Section className={mainFont.className}>
        <div className="title">
          <p>👋🏾</p>
          <h1>Hello there, I&apos;m Kevin.</h1>
        </div>
        <h2>
          A product engineer that enjoys building things for the web and am
          currently building at <a href="https://hubspot.com">Hubspot</a>.
        </h2>
        <p>
          Over the years, I&apos;ve worn many hats — software engineering, solutions
          architecture, developer relations, and engineering leadership. Part of my
          journey has been leading technical teams at places like{' '}
          <a href="https://dropbox.com">Dropbox</a> and{' '}
          <a href="https://khoros.com/">Khoros</a> (fka Spredfast).
        </p>
        <p>
          These days, I&apos;m enjoying heads down eng work writing a lot of fullstack{' '}
          <code className={monoFont.className}>Typescript</code> but also dabbling in{' '}
          <code className={monoFont.className}>Golang</code> and{' '}
          <code className={monoFont.className}>Python</code>.
        </p>
        <p>
          Outside of work, you might find me hosting a{' '}
          <a href="https://whiskypick.com">whiskey tasting</a>, hitting the trails for a
          run, or spending time with my wife and daughter.
        </p>
        <ul>
          <li className="li-1">
            <a href="mailto:a2V2aW4ubmF5YXJAZ21haWwuY29t">
              <FaEnvelope size={20} />
              <span>Email</span>
            </a>
          </li>
          <li className="li-2">
            <a href="https://github.com/kevinnayar">
              <FaGithub size={20} />
              <span>Github</span>
            </a>
          </li>
          <li className="li-3">
            <a href="https://linkedin.com/in/kevinnayar">
              <FaLinkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </Section>
    </>
  );
}

Index.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
