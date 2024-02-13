import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Meta from './Meta';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Meta />
      <Box as="main">{children}</Box>
    </Box>
  );
};

export default Layout;
