import React from 'react';
import { Box, Link, Text, Icon } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" p = {6} pb = {0} textAlign="center">
      <Text fontSize="lg">
        Made with <Icon as={FaHeart} color="red.600" /> by 
        <Link href="https://fazmain.com" isExternal color="cyan.700" ml={1}>
          Faiaz
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
