// Redux
import { io } from 'socket.io-client';
import store from '../store/store';

// Actions
import { setEgmStatus } from '../store/actions/egmActions';

const SERVER = 'http://192.168.10.119:3030';

let socket;

let egmStatusTmp;

export const temp = () => {};

export const connectWithSocket = () => {
  socket = io(SERVER);

  socket.on('connect', () => {
  });

  socket.on('status', (status) => {
    if (JSON.stringify(egmStatusTmp) === JSON.stringify(status)) return;
    egmStatusTmp = status;
    store.dispatch(setEgmStatus(status));
  });

  socket.on('disconnect', () => {
  });
};
