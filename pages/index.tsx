import { NextPage } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { getAllInfoPosts, ContentItem } from '../lib/api';
import Layout from '../components/Layout/Layout';
import Section from '../components/Section/Section';

const font = JetBrains_Mono({ subsets: ['latin'] });

type Props = {
  posts: Record<string, ContentItem>;
};

export default function Index({ posts }: Props) {
  const htmlAbout = posts?.about.html ?? '';
  const htmlContact = posts?.contact.html ?? '';

  return (
    <>
      <Section html={htmlAbout} />
      <Section html={htmlContact} />
    </>
  );
}

Index.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async () => {
  const posts = await getAllInfoPosts();
  return {
    props: {
      posts,
    },
  };
};
