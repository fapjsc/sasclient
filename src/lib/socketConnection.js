// Redux
import store from '../store/store';

// Actions
import { setEgmStatus } from '../store/actions/egmActions';

import { io } from 'socket.io-client';

const SERVER = 'http://192.168.10.119:3030';

let socket;

let egmStatusTmp;

export const connectWithSocket = () => {
  socket = io(SERVER);

  socket.on('connect', () => {
    console.log('connect socket');
  });

  socket.on('status', status => {
    if (JSON.stringify(egmStatusTmp) === JSON.stringify(status)) return;
    egmStatusTmp = status;
    console.log(status);
    store.dispatch(setEgmStatus(status));
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });
};
