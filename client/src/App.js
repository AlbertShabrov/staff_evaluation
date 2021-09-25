import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {Navbar} from './components/Navbar';
import {Loader} from './components/Loader';
import './App.css'

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
          <div className="row d-flex justify-content-center">
              <div className="col se-page">
                  {routes}
              </div>
          </div>
      </div>
    </Router>
  );
}

export default App;