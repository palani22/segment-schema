import React, { useState } from 'react';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';
import ViewAudience from './components/ViewAudience';
import SegmentSidebar from './components/SegmentBar';

function App() {
  const [isSegmentSidebarOpen, setSegmentSidebarOpen] = useState(false);

  const openSegmentSidebar = () => setSegmentSidebarOpen(true);
  const closeSegmentSidebar = () => setSegmentSidebarOpen(false);

  return (
    <ChakraProvider>
      <Grid
        templateColumns={isSegmentSidebarOpen ? '1fr 400px' : '1fr 0px'}
        height="100vh"
        position="relative"
        transition="all 0.3s ease"
      >
        <GridItem
          position="relative"
          filter={isSegmentSidebarOpen ? 'blur(1px)' : 'none'}
          transition="filter 0.3s ease"
        >
          <ViewAudience openSegmentSidebar={openSegmentSidebar} />
          {isSegmentSidebarOpen && (
            <GridItem
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.3)"
              zIndex={1}
              transition="opacity 0.3s ease"
            />
          )}
        </GridItem>

        {/* Segment Sidebar */}
        {isSegmentSidebarOpen && (
          <GridItem
            bg="white"
            borderLeft="1px solid #e2e8f0"
            zIndex={2}
            position="relative"
            transform={isSegmentSidebarOpen ? 'translateX(0)' : 'translateX(100%)'}
            transition="transform 0.3s ease"
          >
            <SegmentSidebar closeSegmentSidebar={closeSegmentSidebar} />
          </GridItem>
        )}
      </Grid>
    </ChakraProvider>
  );
}

export default App;
