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

// import HomeScreen from './pages/HomeScreen';
// import AccountScreen from './pages/AccountScreen';
// import AdminScreen from './pages/AdminScreen';
// import AuthLayout from './layout/AuthLayout';

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
      {/* <Switch>
        <AuthLayout>
          <Route path="/home" component={HomeScreen} />
          <Route path="/account" component={AccountScreen} />
          <Route path="/admin" component={AdminScreen} />
        </AuthLayout>
      </Switch> */}
    </Router>
  );
};

export default App;
