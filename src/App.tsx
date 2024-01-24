import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '~/lib/layout';
import Routings from '~/lib/router/Routings';
import { theme } from '~/lib/styles/theme';

import { store } from './lib/app/store';

const App = () => (
  <ChakraProvider theme={theme}>
    <ReduxProvider store={store}>
      <Router>
        <Layout>
          <Routings />
        </Layout>
      </Router>
    </ReduxProvider>
  </ChakraProvider>
);

export default App;
