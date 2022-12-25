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
    }
  }, []);


  return (
    <main>
      <SvgEffect />
      <Header />
      <Content>
        <Section content={allContent.about.contentHtml} />
        <Section content={allContent.contact.contentHtml} />
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



