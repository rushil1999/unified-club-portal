import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Button, CircularProgress } from '@material-ui/core';
import { AuthContext } from '../auth/ProvideAuth';
import { getUserFeedbackForEvent, sendUserFeedback, validateFeedbackObject } from '../../services/eventServices';
import MessageComponent from '../MessageComponent';
import Typography from '@material-ui/core/Typography';
import {labels} from '../../services/constants';

const useStyles = makeStyles({
  root: {
    // width: 200,
    display: 'flex',
    alignItems: 'center',
    height: 400,
    padding: '10px',
    // boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
    border: 'solid',
    borderColor: '#424242'
  },
  addHeight: {
    height: 300
  },
  buttonStyling: {
    padding: '10px'
  },
  ratingStyling: {
    padding: '10px',
    margin: 'auto',
  },
  textFieldStyling: {
    width: '600px',
    margin: 'auto',
  },
  questionFieldStyling: {
    margin: 'auto',
    color: '#009688',
  },
  ratingWidth: {
    width: '220px'
  }
});

const RatingComponent = props => {
  const contextValue = useContext(AuthContext);
  const [hover, setHover] = useState(-1);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [messagePopupState, setMessagePopupState] = useState(false);
  const [isFeedbackGiven, setIsFeedbackGiven] = useState(false);
  const { eventId } = props;
  const { user } = contextValue;
  const [feedbackState, setFeedbackState] = useState({
    value: 2,
    comments: ''
  });

  useEffect(() => {
    const getUserFeedback = async () => {
      setLoading(true);
      const response = await getUserFeedbackForEvent(user['_id'], eventId);
      if (response.status === 200 && response.data.success === true) {
        const { stars, comments } = response.data.data;
        setFeedbackState({
          value: stars,
          comments
        });
        setIsFeedbackGiven(true);
        setLoading(false);
      }
      else if (response.status === 500) {
        console.log(response.data.errors[0]);
        setMessagePopupState('Internal Server Error');
        setMessagePopupState(true);
      }
      else if (response.status === 200 && response.data.success === false) {
        setLoading(false);
      }
    }
    getUserFeedback(); // eslint-disable-next-line
  }, [])

  const submitUserFeedback = async () => {
    const feedback = {
      eventId,
      userId: user['_id'],
      stars: value,
      comments
    };
    const errors = validateFeedbackObject(feedback);
    if (errors.length === 0) {
      const response = await sendUserFeedback(feedback);
      if (response.status === 201) {
        const { stars, comments } = response.data.data;
        setMessage('Feedback Submitted Successfully');
        setMessagePopupState(true);
        setFeedbackState({
          value: stars,
          comments
        });
        setIsFeedbackGiven(true);
      }
      else if (response.status === 409) {
        setMessage('Your Feedback Already Exists');
        setMessagePopupState(true);
      }
      else if (response.status === 500) {
        console.log(response.data.errors);
        setMessage('Internal Server Error');
        setMessagePopupState(true);
      }
    }
    else{
      console.log(errors);
      setMessage(errors[0]);
      setMessagePopupState(true);
    }

  }

  const onCommentsFieldChange = event => {
    setFeedbackState({ ...feedbackState, comments: event.target.value });
  }

  const { value, comments } = feedbackState;
  return (
    <React.Fragment>
      {loading ? <CircularProgress /> : (
        <>
          {messagePopupState && <MessageComponent open={messagePopupState} messageContent={message} setMessagePopupState={setMessagePopupState} />}
          <Card className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.questionFieldStyling}>
                  <Typography component="h4" variant="h4" key="name">
                    {isFeedbackGiven ? 'Thank you for sharing your experience' : 'How was you Experience ? '}
                  </Typography>
                </div>
              </Grid>
              <div className={classes.ratingStyling}>
                <Grid item container xs={12}>
                  <Grid item xs={6}>
                    <div className={classes.ratingWidth}>
                      <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          setFeedbackState({ ...feedbackState, value: newValue });
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        disabled={isFeedbackGiven}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="h6" variant="h6" key="name">
                      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                    </Typography>

                  </Grid>
                </Grid>
              </div>

              <Grid item xs={12}>
                <div className={classes.textFieldStyling}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Additional Comments"
                    multiline
                    rows={4}
                    value={comments}
                    variant="outlined"
                    name="comments"
                    onChange={onCommentsFieldChange}
                    disabled={isFeedbackGiven}
                  />
                </div>
              </Grid>
              <Grid item xs={12} >
                <div className={classes.buttonStyling}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitUserFeedback}
                    disabled={isFeedbackGiven}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        </>
      )}

    </React.Fragment>
  );
}
export default RatingComponent;