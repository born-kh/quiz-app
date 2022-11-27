import React from 'react';
import Quiz from './components/Quiz';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', p: 2 }}>
        <Quiz />
      </Box>
    </Container>
  );
}

export default App;
