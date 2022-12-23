import { useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Section from '../components/Section/Section';
import { getContent, ContentItem } from '../lib/api';

type Props = {
  allContent: Record<string, ContentItem>,
}

export default function Index({ allContent }: Props) {
  useEffect(() => {
    const links = document.getElementsByTagName('a');
    for (const link of links) {
      link.setAttribute('target', '_blank');
    }
  }, []);

  return (
    <main>
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



