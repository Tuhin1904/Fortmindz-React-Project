import { Box, CircularProgress } from '@mui/material';

const FullPageLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FullPageLoader;
