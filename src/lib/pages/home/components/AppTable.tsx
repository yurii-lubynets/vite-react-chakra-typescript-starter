import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { useFetchUsersQuery } from '~/lib/services/api';

export const AppTable = () => {
  const { data = [], isLoading, isError } = useFetchUsersQuery();

  return (
    <>
      {isLoading && <Spinner />}
      {isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Your request was failed.</AlertTitle>
          <AlertDescription>Please try again</AlertDescription>
        </Alert>
      )}
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Events</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.phoneNumber}</Td>
              <Td>
                {item.tickets.map((i) => (
                  <div key={i}>{i}</div>
                ))}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
