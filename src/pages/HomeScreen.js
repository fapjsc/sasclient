import { useEffect } from 'react';

// Socket
import { connectWithSocket } from '../lib/socketConnection';

// Components
import MachineList from '../components/gameMachine/MachineList';

// Helper
import { _getUserRole } from '../lib/helper';

const HomeScreen = ({ history }) => {
  useEffect(() => {
    connectWithSocket();
  }, []);

  // useEffect(() => {
  //   const role = _getUserRole();

  //   if (!role) history.replace('/login');
  // }, [history]);

  return (
    <div>
      <MachineList />
    </div>
  );
};

export default HomeScreen;
