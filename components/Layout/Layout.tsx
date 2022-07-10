import Head from 'next/head'
import { WithKids } from '../../types/typeDefs'

const Layout = ({ children }: WithKids) => {
  const title = 'Kevin Nayar'
  const desc = 'Personal portfolio site for Kevin Nayar'
  const src = '../public/profile.png'

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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout