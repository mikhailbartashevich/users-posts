import { ReactElement } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const withQueryConfig = (component: ReactElement) => (
  <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
);
