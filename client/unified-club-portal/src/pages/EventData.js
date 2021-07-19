import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventInfo from '../components/event/EventInfo';
import UserList from '../components/user/UserList';
import { fetchEventDetails, registerUser } from '../services/eventServices';
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { AuthContext } from '../components/auth/ProvideAuth';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


const EventData = props => {
  const contextValue = useContext(AuthContext);
  let { id } = useParams();
  const classes = useStyles();

  const [eventState, setEventState] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = contextValue;

  useEffect(() => {
    const getEventDetails = async () => {
      setLoading(true);
      const response = await fetchEventDetails(id);
      if (response.success === true && !response.message) {
        setEventState(response.data);
        setLoading(false);
      }
      else if (response.message) {
        window.alert(response.message);
      }
      else {
        console.log(response.errors);
      }
    };

    getEventDetails();
  }, [id]);

  const registerUserToEvent = async () => {
    const response = await registerUser(user['_id'], eventState['_id']);
    if (response.success === true) {
      window.alert('Registered in Event');
      setEventState(response.data);
    }
    else if (response.status === 412) {
      console.log(response.message);
      window.alert(response.message);
    }
    else {
      console.log(response.errors);
      window.alert(response.errors);
    }
  }


  return (
    <React.Fragment>
      {loading ? <CircularProgress /> : (
        <>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={5} alignItems="center">
                <Grid key="club-info" item xs={12} md={8}>
                  <EventInfo event={eventState} />
                </Grid>
              </Grid>
            </Grid>
            {!eventState.participants.includes(user['_id']) && (
              <Grid container item className={classes.root} >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={registerUserToEvent}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            )}

            <Grid container item className={classes.root}>
              <Grid item xs={6} >
                <UserList ids={eventState.participants} />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
}

export default EventData;