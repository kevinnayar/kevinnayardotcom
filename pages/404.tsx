import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout/Layout';
import Section from '../components/Section/Section';

const Custom404 = () => (
  <Section>
    <h1>Whoops!</h1>

    <h2>
      This page doesn&apos;t exist. Go back to the <Link href="/">home page</Link>.
    </h2>
  </Section>
);

Custom404.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export default Custom404;
