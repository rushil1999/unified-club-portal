import React, {useContext} from 'react';
import { AuthContext } from '../components/auth/ProvideAuth';
import EventList from '../components/event/EventList';

const UserEvents = props => {
  const contextValue = useContext(AuthContext);
  const { user } = contextValue;
  const { registeredEvents } = user;
  return(
    <React.Fragment>
      {registeredEvents.length>0 ?
        (<EventList ids={registeredEvents}/>) : 
        (<h3>No Events</h3>)
      }
         
    </React.Fragment>
  );
}

export default UserEvents;