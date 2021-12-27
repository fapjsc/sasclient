import React, { useEffect } from 'react';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Routes
import PermissionRoute from './components/PermissionRoute';

// Actions
import { setUserInfo } from './store/actions/userActions';

// Helpers
import { _getUserData } from './lib/helper';

// Style
import './App.scss';

const App = () => {
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = _getUserData('token');

    if (userInfo) { dispatch(setUserInfo(userInfo.loginData)); }
  }, [dispatch]);

  return (
    <Router>
      <PermissionRoute />
    </Router>
  );
};

export default App;
