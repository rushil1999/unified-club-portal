import React, {useContext} from 'react';
import { AuthContext } from '../components/auth/ProvideAuth';

const UserClubs = props => {
  const context = useContext(AuthContext);
  const { user } = context;
  const { registeredClubs } = user;


  return(
    <React.Fragment>
      {/* {registeredClubs.length > 0 ? 
      (ClubsList): ()
    } */}
    </React.Fragment>
  );
}