import { useState, useEffect, useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AuthContext } from './ProvideAuth';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivateRoute = ({ children, ...rest }) => {
  const contextValue = useContext(AuthContext);
  console.log(contextValue);
  console.log(children);
  return (
    <div>

    {contextValue.authenticated == null && contextValue.loading ? <CircularProgress/> : (<Route
        {...rest}
        render={({ location }) =>
          contextValue.authenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />)}
    </div>
  );
}

export default PrivateRoute;
