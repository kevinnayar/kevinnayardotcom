import { useEffect } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { getContent, ContentItem } from '../lib/api';

import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Section from '../components/Section/Section';

type Props = {
  allContent: Record<string, ContentItem>,
}

export default function Index({ allContent }: Props) {
  const SvgEffect = dynamic(() => import('../components/SvgEffect/SvgEffect'), {
    ssr: false,
  });

  useEffect(() => {
    const links = document.getElementsByTagName('a');

    for (const link of links) {
      link.setAttribute('target', '_blank');

      const href = link.getAttribute('href');
      const prefix = 'mailto:';

      if (href && href.startsWith(prefix)) {
        let decoded: null | string = null;
        try {
          const encoded = href.split(prefix)[1];
          decoded = window.atob(encoded);
        } catch (e) {
          // do nothing
        }
        if (decoded) {
          link.setAttribute('href', `${prefix}${decoded}`);
        }
      }
    }
  }, []);

  const htmlAbout = allContent?.about.html ?? '';
  const htmlContact = allContent?.contact.html ?? '';

  return (
    <main>
      <SvgEffect
        canvasHeight={600}
        numIterations={20}
        numTriangles={128}
        minSize={30}
        maxSize={180}
      />
      <Header />
      <Content>
        <Section html={htmlAbout} />
        <Section html={htmlContact} />
      </Content>
    </main>
  );
}

Index.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async () => {
  const allContent = await getContent();
  return {
    props: {
      allContent,
    },
  };
};



