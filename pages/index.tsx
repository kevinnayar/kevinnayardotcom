import { NextPage, GetStaticProps } from 'next';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';

export default function Index() {
  return (
    <main>
      <Header />
      <Content />
    </main>
  );
}

Index.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};



