import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Spinner,
} from '@chakra-ui/react';

import { useFetchTenantOnboardingQuery } from '../services/api';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { data, isFetching, isError } = useFetchTenantOnboardingQuery();

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Flex
        as="header"
        width="full"
        align="center"
        alignSelf="flex-start"
        justifyContent="center"
        gridGap={2}
      >
        {isFetching && <Spinner />}
        {!isFetching && isError && (
          <Alert status="error" borderRadius="xl">
            <AlertIcon />
            <AlertTitle>Your request was failed</AlertTitle>
            <AlertDescription>
              Your Chakra experience may be degraded.
            </AlertDescription>
          </Alert>
        )}
        {!isFetching && data && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Data was fetched successfully!</AlertTitle>
          </Alert>
        )}
      </Flex>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
