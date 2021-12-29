import React, { useEffect } from 'react';

// Socket
import { connectWithSocket, closeSocketWithAgent } from '../lib/socketConnection';

// Components
import MachineList from '../components/gameMachine/MachineList';

const HomeScreen = () => {
  useEffect(() => {
    connectWithSocket();

    return () => {
      closeSocketWithAgent();
    };
  }, []);

  return (
    <div>
      <MachineList />
    </div>
  );
};

export default HomeScreen;
