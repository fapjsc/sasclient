import { useEffect } from 'react';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import PermissionRoute from './components/PermissionRoute';

// Redux
import { useDispatch } from 'react-redux';

// Actions
import { setUserInfo } from './store/actions/userActions';

// Helpers
import { _getToken } from './lib/helper';

// Style
import './App.scss';

const App = () => {
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = _getToken('token');

    if (userInfo) {
      dispatch(setUserInfo(userInfo));
    }
  }, [dispatch]);

  return (
    <Router>
      <PermissionRoute />
    </Router>
  );
};

export default App;
