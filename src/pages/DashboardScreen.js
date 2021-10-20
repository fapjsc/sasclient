import { useEffect } from 'react';

// Socket
import { connectWithSocket } from '../lib/socketConnection';

// Components
import MachineList from '../components/gameMachine/MachineList';

const HomeScreen = () => {
  useEffect(() => {
    connectWithSocket();
  }, []);

  return (
    <div>
      <MachineList />
    </div>
  );
};

export default HomeScreen;
