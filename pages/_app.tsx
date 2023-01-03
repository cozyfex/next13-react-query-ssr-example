import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

import axiosSetting from '../settings/axios-setting';

import '../styles/globals.css';

axiosSetting();

export default function App ({ Component, pageProps }: AppProps) {
  const [queryClient, setQueryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
