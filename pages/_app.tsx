
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '../styles/global.scss'

type NextPageWithLayout = NextPage & {
  getLayout(page: NextPage): JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: any) => page)

  // @ts-ignore
  return getLayout(<Component { ...pageProps } />)
}

