import { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AuthContext } from './ProvideAuth';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const contextValue = useContext(AuthContext);
  return (
    <div>

    {contextValue.authenticated == null && contextValue.loading ? <CircularProgress/> : (<Route
        {...rest}
        render={({ location }) =>
          contextValue.authenticated ? (
            <Component></Component>
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
