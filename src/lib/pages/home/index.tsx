import { Grid, Heading } from '@chakra-ui/react';

import { AppTable } from './components/AppTable';

const Home = () => (
  <Grid gap={4}>
    <Heading>App Inventory</Heading>
    <AppTable />
  </Grid>
);

export default Home;
