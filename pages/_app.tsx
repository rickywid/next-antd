import React from 'react';
import 'antd/dist/antd.less';
import '../styles/global.less';
// eslint-disable-next-line no-unused-vars
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line
  return <Component {...pageProps} />;
}
