import { createTheme, MantineProvider } from '@mantine/core';
import { Shell } from './Shell';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import './App.css'
import '@mantine/core/styles.css';

const theme = createTheme({});
const queryClient = new QueryClient()


function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Shell />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App
