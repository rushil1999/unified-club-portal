import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventInfo from '../components/event/EventInfo';
import UserList from '../components/user/UserList';
import { fetchEventDetails, registerUser, getEventStatus, sendUserFeedback, getUserFeedbackForEvent } from '../services/eventServices';
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../components/auth/ProvideAuth';
import { fetchResource } from '../services/resourceServices';
import { DB_URL } from '../services/constants';
import RatingComponent from '../components/event/RatingComponent';
import Card from '@material-ui/core/Card';
import MessageComponent from '../components/MessageComponent';



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
  image: {
    width: '100%',
    height: '300px'
  },
  registerButton: {
    margin: 'auto',
  },
  memberSection: {
    width: '50%',
    margin: 'auto'
  }
}));


const EventData = props => {
  const contextValue = useContext(AuthContext);
  let { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [eventState, setEventState] = useState();
  const [loading, setLoading] = useState(true);
  const [imagePath, setImagePath] = useState();
  const [eventStatusState, setEventStatusState] = useState();
  const [ratingComponentState, setRatingComponentState] = useState(false);
  const [messagePopupState, setMessagePopupState] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = contextValue;

  useEffect(() => {
    

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

  const getEventDetails = async () => {
    setLoading(true);
    const response = await fetchEventDetails(id);
    if (response.success === true && !response.message) {
      setEventState(response.data);
      setEventStatusState(getEventStatus(response.data.from, response.data.to));
      const { publicFiles } = response.data;
      if (publicFiles.length > 0) {
        const resourceResponse = await fetchResource(publicFiles[0]['_id']);
        if (resourceResponse) {
          const { path } = resourceResponse.data;
          setImagePath(path);
        }
        else {
          console.log(resourceResponse.errors);
        }
      }
      setLoading(false);
    }
    else if (response.message) {
      setMessage(response.message);
      setMessagePopupState(true);
    }
    else {
      console.log(response.errors);
    }
  };

  const redirectToEventForm = () => {
    history.push(`/event/new/${eventState.clubId}/${eventState['_id']}`)
  }

  const openRatingComponentState = () => {
    setRatingComponentState(true);
  }

  const submitUserFeedback = async feedback => {
    feedback['eventId'] = eventState['_id'];
    feedback['userId'] = user['_id'];
    const response = await sendUserFeedback(feedback);
    console.log(response);
    if(response.success === true){
      setMessage('Feedback Submitted Successfully');
      setMessagePopupState(true);
    }
    else{
      setMessage(response.errors[0]);
      setMessagePopupState(true);

    }
  }

  console.log(eventStatusState);
  return (
    <React.Fragment>
      {loading ? <CircularProgress /> : (
        
        <div >
          {messagePopupState && <MessageComponent open={messagePopupState} messageContent={message} setMessagePopupState={setMessagePopupState}/>}
          {imagePath && (<><img className={classes.image} src={`${DB_URL}/${imagePath}`} alt="event" />
            <br></br>
            <br></br></>)}
          <Grid container justifyContent="center" spacing={5} alignItems="center">
            <Grid key="club-info" item xs={12} md={8}>
              <EventInfo event={eventState} />
            </Grid>
          </Grid>
          <br></br>
          <Grid container item className={classes.registerButton} >
            {(!eventState.participants.includes(user['_id']) || !user.role === 'admin') && (eventStatusState < 2) &&
              (<Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={registerUserToEvent}
                >
                  Register
                </Button>
              </Grid>)
            }
            {(user.role === 'admin' && eventStatusState === -1) && (<Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={redirectToEventForm}
              >
                Edit
              </Button>
            </Grid>)}
            {(user.role === 'participant' && eventStatusState === 2) && (<Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={openRatingComponentState}
              >
                Rate Event
              </Button>
            </Grid>)}
          </Grid>
          {ratingComponentState && (
            <>
            <br></br>
            <Card>
            <Grid item container>
              <Grid item xs={12}>
                <RatingComponent eventId={eventState['_id']} submitUserFeedback={submitUserFeedback}/>
              </Grid>
            </Grid>
            </Card>
            </>
          )}
          <br></br>
          {<Grid container item>

          </Grid>}
          <Grid container item className={classes.memberSection} justifyContent="center">
            <Grid item xs={12} >
              <UserList ids={eventState.participants} />
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
}

export default EventData;