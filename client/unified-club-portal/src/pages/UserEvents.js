import React, {useContext} from 'react';
import { AuthContext } from '../components/auth/ProvideAuth';
import EventGrid from '../components/event/EventGrid';

const UserEvents = props => {
  const contextValue = useContext(AuthContext);
  const { user } = contextValue;
  const { registeredEvents } = user;
  return(
    <React.Fragment>
      {registeredEvents.length>0 ?
        (<EventGrid  ids={registeredEvents}/>) : 
        (<h4>You have no registered events!</h4>)
      }
         
    </React.Fragment>
  );
}

export default UserEvents;