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
        (<h3>No Events</h3>)
      }
         
    </React.Fragment>
  );
}

export default UserEvents;