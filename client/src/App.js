import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {Navbar} from './components/Navbar';
import {Loader} from './components/Loader';

function App() {
  // const {ready, token, login, logout, userId} = useAuth();
  const isAuthenticated = true;
  const routes = useRoutes(isAuthenticated);

  // if (!ready) {
  //   return <Loader />
  // }

  return (
    <Router>
      { isAuthenticated && <Navbar /> }
      <div className="container">
        {routes}
      </div>
    </Router>
  );
}

export default App;