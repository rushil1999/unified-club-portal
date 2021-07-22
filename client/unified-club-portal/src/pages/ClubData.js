import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClubInfo from '../components/club/ClubInfo';
import UserList from '../components/user/UserList';
import EventList from '../components/event/EventList';
import { fetchClubDetails, enrollMemberInClub, removeMemberFromClub } from '../services/clubServices';
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { AuthContext } from '../components/auth/ProvideAuth';
import { useHistory } from 'react-router';
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
}));


const ClubData = props => {
  const contextValue = useContext(AuthContext);
  const { user } = contextValue;
  let { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [clubState, setClubState] = useState();
  const [loading, setLoading] = useState(true);
  const [messageState, setMessageState] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getClubDetails = async () => {
      setLoading(true);
      const response = await fetchClubDetails(id);
      if (response.success === true && !response.message) {
        setClubState(response.data);
        setLoading(false);
      }
      else if (response.message) {
        window.alert(response.message);
      }
      else {
        console.log(response.errors);
      }
    };

    getClubDetails();
  }, [id]);


  const enrollHandler = async () => {
    const response = await enrollMemberInClub(user['_id'], id);
    if (response.success === true) {
      setClubState(response.data);
      setMessage('Enrolled Successfully');
      setMessageState(true);
    } else {
      console.log(response.errors)
      window.alert('Error Ocurred');
      setMessage('Some Error Occured');
      setMessageState(true);
    }
  }

  const leaveClubHandler = async () => {
    const userObj = window.localStorage.getItem('user');
    const user = JSON.parse(userObj);
    const response = await removeMemberFromClub(user['_id'], id);
    if (response.success === true) {
      setClubState(response.data);
    } else {
      console.log(response.errors)
      window.alert('Error Ocurred');
    }
  }

  const redirectToNewEventForm = () => {
    history.push(`/event/new/${clubState['_id']}`)
  }

  const isUserAlreadyEnrolled = clubState?.members.includes(user['_id']);

  return (
    <React.Fragment>
      {messageState && <MessageComponent open={messageState} messageContent={message} setMessageState={setMessageState}/>}
      {loading ? <CircularProgress /> : (
        <>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={5} alignItems="center">
                <Grid key="club-info" item xs={12} md={8}>
                  <ClubInfo club={clubState} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item className={classes.root} >
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={isUserAlreadyEnrolled ? (leaveClubHandler) : (enrollHandler)}
                >
                  {isUserAlreadyEnrolled ? 'Leave' : 'Enroll'}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={redirectToNewEventForm}
                >
                  Organize an Event
                </Button>
              </Grid>
            </Grid>
            <Grid container item className={classes.root} spacing={2}>
              <Grid item xs={6} >
                <UserList ids={clubState.members} />
              </Grid>
              <Grid item xs={6}>
                <EventList ids={clubState.events} club={clubState}/>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
}

export default ClubData;