import { Grid, Heading } from '@chakra-ui/react';

import { AppTable } from './components/AppTable';

const Home = () => (
  <Grid gap={4} p={4}>
    <Heading>Tickets table</Heading>
    <AppTable />
  </Grid>
);

export default Home;
