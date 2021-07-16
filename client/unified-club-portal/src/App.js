import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import ProvideAuth from './components/auth/ProvideAuth';
import PrivateRoute from './components/auth/PrivateRoute';
import ClubGrid from './pages/ClubGrid';
import ClubForm from './pages/ClubForm';
import ClubData from './pages/ClubData';

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <Dashboard component={() => {
            return (
              <Switch>
                <Route
                  path='/signup'
                  exact
                  component={SignUp}>
                </Route>
                <Route
                  path='/signin'
                  exact
                  component={SignIn}>
                </Route>
                <PrivateRoute
                  path='/clubs'
                  exact
                  component={ClubGrid}>
                </PrivateRoute>
                <PrivateRoute
                  path='/club/new'
                  exact
                  component={ClubForm}>
                </PrivateRoute>
                <PrivateRoute
                  path='/club/:id'
                  exact
                  component={ClubData}>
                </PrivateRoute>
              </Switch>
            );
          }} />
        </Router>
      </ProvideAuth>


    </div>
  );
}

export default App;


