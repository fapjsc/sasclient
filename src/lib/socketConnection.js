// Redux
import { io } from 'socket.io-client';
import store from '../store/store';
import { AGENT_URL } from './api-store/utils';

// Actions
import { setEgmStatus } from '../store/actions/egmActions';

let socket;

let egmStatusTmp;
let egmDataTmp;

export const temp = () => {};

export const connectWithSocket = () => {
  socket = io(AGENT_URL);

  socket.on('connect', () => {
    console.log('connect agent with socket');
  });

  socket.on('status', (status) => {
    if (JSON.stringify(egmStatusTmp) === JSON.stringify(status)) return;
    egmStatusTmp = status;
    store.dispatch(setEgmStatus(status));
  });

  socket.on('egmList', (data) => {
    if (egmDataTmp === JSON.stringify(data)) return;
    egmDataTmp = JSON.stringify(data);
    store.dispatch(setEgmStatus(data));
  });

  socket.on('disconnect', () => {
    console.log('agent socket disconnect');
  });

  socket.on('connect_failed', (e) => {
    console.log(e);
  });
};

export const closeSocketWithAgent = () => {
  socket?.close();
};
