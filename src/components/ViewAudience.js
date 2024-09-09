import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';

const ViewAudience = ({ openSegmentSidebar }) => {
    return (
        <>
            <NavBar
                title="View Audience"
            />
            <Box
                position="absolute"
                width="100%"
                height="calc(100vh - 60px)"
                bg="rgba(0, 0, 0, 0.5)"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    variant="outline"
                    _hover={{ bg: 'white.500' }}
                    textColor="white"
                    onClick={openSegmentSidebar}
                    position="absolute"
                    top="30px"
                    left="50%"
                    transform="translateX(-50%)"
                >          Save Segment
                </Button>
            </Box>
        </>
    );
};

export default ViewAudience;
