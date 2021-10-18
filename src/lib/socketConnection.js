// Redux
import store from '../store/store';

// Actions
import { setEgmStatus } from '../store/actions/egmActions';

import { io } from 'socket.io-client';

const SERVER = 'http://192.168.10.119:3030';

let socket;

let tmp;

let egmStatusArr = [];

export const connectWithSocket = () => {
  socket = io(SERVER);

  socket.on('connect', () => {
    console.log('connect socket');
  });

  socket.on('status', status => {
    if (status.Resp) return;
    if (tmp && tmp.EGMnum === status.EGMnum && tmp.excCode === status.excCode) return;
    tmp = status;
    egmStatusArr.push(status);
    store.dispatch(setEgmStatus(status));
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });
};
