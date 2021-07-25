import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import MessageComponent from "../MessageComponent";
import { getFeedbacksForEvent } from '../../services/eventServices';
import FeedbackCard from './FeedbackCard';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
  },
  root: {
    margin: 'auto',
  },
  inline: {
    display: 'inline',
  },

}));


const EventFeedbackList = props => {
  const {eventId} = props;
  const classes = useStyles();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagePopupState, setMessagePopupState] = useState(false);
  const [message, setMessage] = useState('');
  

  useEffect(()=>{
    const getFeedbacks = async () => {
      setLoading(true);
      const response = await getFeedbacksForEvent(eventId);
      if(response.status === 200){
        setFeedbackList(response.data.data);
        setLoading(false);
      } 
      else if( response.status === 500){
        setMessage('Internal Server Error');
        setMessagePopupState(true);
        setLoading(false);
      }
    } 
    getFeedbacks(); // eslint-disable-next-line
  },[])

  return(
    <div>
    {loading ? (
      <CircularProgress />
    ) : (
      <>
      {messagePopupState && <MessageComponent open={messagePopupState} messageContent={message} setMessagePopupState={setMessagePopupState}/>}
      <div>
      <Typography component="h2" variant="h5" >
            Feedbacks
        </Typography>
        <Grid
          key="outerGrid"
          className={classes.root}
          container justify="center"
        >
          {feedbackList.map((feedback) => {
            return (
              <Grid key={`innerGrid-${feedback['_id']}`} item xs={12} md={6}>
                <div className={classes.grid_card}
                  key={feedback['_id']}
                >
                    <FeedbackCard feedback={feedback}/>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
      </>
    )}
  </div>);
};  

export default EventFeedbackList;