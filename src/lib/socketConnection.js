// Redux
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import store from '../store/store';
import { AGENT_URL } from './api-store/utils';

// Actions
import { setEgmStatus } from '../store/actions/egmActions';
// eslint-disable-next-line
import { setShowLiveChatMessage, setShowLiveEgmStatus } from '../store/actions/showLiveActions';

// Helpers
import { scrollToBottomAnimated } from './scrollToBottom';
import { isEmptyObj } from './helper';

let socket;

let egmStatusTmp;
let egmDataTmp;

// Show live
let allowEgmListInComing = true;

export const connectWithSocket = () => {
  socket = io(AGENT_URL);

  socket.on('connect', () => {
    console.log('connect agent with socket');

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
  });
};

export const showLiveConnect = () => {
  socket = io(AGENT_URL);
  socket.on('connect', () => {
    console.log('live show socket');

    // Chat message
    socket.on('chatRoomDemo', (message) => {
      const formatMessage = { message, id: uuid() };
      store.dispatch(setShowLiveChatMessage(formatMessage));
      scrollToBottomAnimated('show-live-chat-content');
    });

    // Egm list
    socket.on('onlineEgmList', (data) => {
      if (!allowEgmListInComing) return;
      allowEgmListInComing = false;

      const filterData = Object.values(data).filter((el) => el.stream_url
      && !isEmptyObj(el.member));

      const formatData = filterData.map((el) => ({
        ip: el.ip,
        member: el.member,
        brand: el.brand_name,
        name: el.name,
        stream: el.stream_url,
      }));

      store.dispatch(setShowLiveEgmStatus(formatData));

      setTimeout(() => {
        allowEgmListInComing = true;
      }, 3000);
    });
  });
};

export const closeSocketWithAgent = () => {
  socket?.close();
};

export const showLiveSendMessage = (message) => {
  if (!socket) return;
  socket.emit('chatRoomDemo', message);
};
