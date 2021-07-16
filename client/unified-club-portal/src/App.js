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
              component={() => {
                return (
                  <Dashboard
                    component={() => {
                      return (<ClubGrid />)
                    }} />
                );
              }}>
            </PrivateRoute>
            <PrivateRoute
              path='/club/new'
              exact
              component={() => {
                return (
                  <Dashboard
                    component={() => {
                      return (<ClubForm />)
                    }} />
                );
              }}>
            </PrivateRoute>
            <PrivateRoute
              path='/club/:id'
              exact
              component={() => {
                return (
                  <Dashboard
                    component={() => {
                      return (<ClubData />)
                    }} />
                );
              }}>
            </PrivateRoute>
          </Switch>
        </Router>
        {/* <Router>
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
          </Switch>
        </Router> */}
      </ProvideAuth>


    </div>
  );
}

export default App;


