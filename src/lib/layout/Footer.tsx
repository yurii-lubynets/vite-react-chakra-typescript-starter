import { Button, Flex, Text } from '@chakra-ui/react';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { environmentSelector, setEnvironment } from '../features/origin';

const Footer = () => {
  const storedEnvironment = useAppSelector(environmentSelector);
  const dispatch = useAppDispatch();

  const handlefooterButtonClick = useCallback(() => {
    dispatch(
      setEnvironment(
        storedEnvironment === 'DEVELOPMENT' ? 'PRODUCTION' : 'DEVELOPMENT'
      )
    );
  }, [dispatch, storedEnvironment]);

  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
      gap="5"
    >
      <Text fontSize="xs">{new Date().getFullYear()}</Text>
      <Button onClick={handlefooterButtonClick}>{storedEnvironment}</Button>
    </Flex>
  );
};

export default Footer;
