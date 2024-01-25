import {
  Grid,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { PaginationTable } from 'table-pagination-chakra-ui';

import { useAppDispatch } from '~/lib/app/hooks';
import { setSelectedAppId } from '~/lib/features/origin';
import { useFetchAppsMutation } from '~/lib/services/api';
import type { App } from '~/lib/services/queries/tenant.queries';

import { AppDrawer } from './components/AppDrawer';

const Home = () => {
  const dispatch = useAppDispatch();
  const [fetchApps] = useFetchAppsMutation();

  const [pageSize, setPageSize] = useState(25);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [tableData, setTableData] = useState<Array<App>>([]);

  useEffect(() => {
    const handle = async () => {
      const { data } = await fetchApps({ pageSize: +pageSize, pageNumber });
      setTableData(data.appRows);
      setTotalItemsCount(data.totalCount);
    };
    handle();
  }, [fetchApps, pageNumber, pageSize]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRowClick = useCallback(
    (appId: string) => {
      dispatch(setSelectedAppId(appId));
      onOpen();
    },
    [dispatch, onOpen]
  );

  return (
    <Grid gap={4}>
      <Heading>App Inventory</Heading>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Connector</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item) => {
            return (
              <Tr key={item.appId} onClick={() => handleRowClick(item.appId)}>
                <Td>{item.appName}</Td>
                <Td>{item.category}</Td>
                <Td>{item.appSources}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <PaginationTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageIndex={pageNumber}
        setPageIndex={setPageNumber}
        totalItemsCount={totalItemsCount}
        pageSizeOptions={[25, 50]}
      />
      <AppDrawer isOpen={isOpen} onClose={onClose} />
    </Grid>
  );
};

export default Home;
