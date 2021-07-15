import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClubInfo from '../components/club/ClubInfo';
import UserList from '../components/user/UserList';
import { fetchClubDetails, enrollMemberInClub, removeMemberFromClub } from '../services/clubServices';
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';


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
  let { id } = useParams();
  const classes = useStyles();

  const [clubState, setClubState] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClubDetails = async () => {
      setLoading(true);
      const response = await fetchClubDetails(id);
      if (response.success === true && !response.message) {
        console.log(response);
        setClubState(response.data);
        setLoading(false);
      }
      else if(response.message){
        window.alert(response.message);
      }
      else {
        console.log(response.errors);
      }
    };

    getClubDetails();
  }, [id]);


  const enrollHandler = async () => {
    const userObj = window.localStorage.getItem('user');
    const user = JSON.parse(userObj);
    const response = await enrollMemberInClub(user['_id'], id);
    if(response.success === true){
      console.log(response);
      setClubState(response.data);
    }else{
      console.log(response.errors)
      window.alert('Error Ocurred');
    }
  }

  const leaveClubHandler = async () => {
    const userObj = window.localStorage.getItem('user');
    const user = JSON.parse(userObj);
    const response = await removeMemberFromClub(user['_id'], id);
    if(response.success === true){
      console.log(response);
      setClubState(response.data);
    }else{
      console.log(response.errors)
      window.alert('Error Ocurred');
    }
  }

  return (
    <React.Fragment>
      {loading ? <CircularProgress /> : (
        <>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={5}>
                <Grid key="club-info" item>
                  <ClubInfo club={clubState}></ClubInfo>
                </Grid>
                <Grid key="user-list" item>
                  <UserList ids={clubState.members}></UserList>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={enrollHandler}
            >
              Enroll
            </Button>
            </Grid>
            <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={leaveClubHandler}
            >
              Leave
            </Button>
            </Grid>
          </Grid>
        </>
      )}

    </React.Fragment>

  );
}

export default ClubData;