import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatUI from './components/ChatUI';
import BackgroundGif from './images/background.gif';
import Box from '@mui/material/Box';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Box
      sx={{
        backgroundImage: `url(${BackgroundGif})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ChatUI />
    </Box>
  </React.StrictMode>
);
