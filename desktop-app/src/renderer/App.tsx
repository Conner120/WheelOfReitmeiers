/* eslint-disable default-case */
// @ts-ignore
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { WOF } from './WOF';
// @ts-ignore
import background2 from '../../assets/Backgounds/modern.jpeg';
import { useEffect } from 'react';

export function Home() {
  const navigate = useNavigate();

  return (
    <Paper
      style={{
        height: 'calc(100vh - 20px)',
      }}
    >
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Typography variant="h2">Games</Typography>
      </div>
      <Grid container>
        <Grid item xs={4}>
          <Card>
            <CardMedia
              sx={{ height: 300 }}
              image={background2}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Wheel of Fortune
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2-4 players, 1 Host
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Options</Button>
              <Button
                size="small"
                onClick={() => {
                  //scan for ble devices

                  navigator.bluetooth.requestLEScan({
                    filters: [],
                    keepRepeatedDevices: true,
                  });
                  navigator.bluetooth.onadvertisementreceived = (event) => {
                    console.log(event);
                  };
                }}
              >
                scan
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'about',
    element: <WOF />,
  },
]);
