import { Flex, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import React from 'react';

const NavBar = ({ title, onBackClick }) => {
    return (
        <Flex
            as="nav"
            width="100%"
            padding="10px"
            bg="teal.400"
            alignItems="center"
            textColor="white"
        >
            <IconButton
                icon={<ChevronLeftIcon />}
                color="white"
                bg="transparent"
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                _focus={{ boxShadow: 'none' }}
                size="lg"
                onClick={onBackClick}
                aria-label="Back"
            />
            <Text fontSize="md">{title}</Text>
        </Flex>
    );
};

export default NavBar;
