import Head from 'next/head';
import { WithKids } from '../../types/base-types';

const Layout = ({ children }: WithKids) => {
  const title = 'Kevin Nayar';
  const desc = 'Personal site for Kevin Nayar';
  const src = '../public/profile.png';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="https://kevinnayar.com" />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={desc} />

        <meta property="og:image" content={src} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="480" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={src} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};

export default Layout;
