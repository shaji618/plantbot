import Grid from '@mui/material/Grid';
import { FC } from 'react';

const ResponseButtonBar: FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}><button>Button 1</button></Grid>
      <Grid item xs={4}><button>Button 3</button></Grid>
      <Grid item xs={4}><button>Button 1</button></Grid>
    </Grid>
  );
};

export default ResponseButtonBar;
