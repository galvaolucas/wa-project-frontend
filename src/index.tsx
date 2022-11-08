import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { App } from './App';
import theme from './styles/theme';

ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);