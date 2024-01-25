import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
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
    </Flex>
  );
};

export default Footer;
