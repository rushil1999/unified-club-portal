import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Button, CircularProgress } from '@material-ui/core';
import { AuthContext } from '../auth/ProvideAuth';
import { getUserFeedbackForEvent, sendUserFeedback } from '../../services/eventServices';
import MessageComponent from '../MessageComponent';


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    // width: 200,
    display: 'flex',
    alignItems: 'center',
    height: 500,
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
  }
});

const RatingComponent = props => {
  const contextValue = useContext(AuthContext);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [messagePopupState, setMessagePopupState] = useState(false);
  const [isFeedbackGiven, setIsFeedbackGiven] = useState(false);
  const { eventId } = props;
  const { user } = contextValue;

  useEffect(() => {
    const getUserFeedback = async () => {
      setLoading(true);
      const response = await getUserFeedbackForEvent(user['_id'], eventId);
      if (response.status === 200) {
        const { stars, comments } = response.data.data;
        setValue(stars);
        setComments(comments);
        setIsFeedbackGiven(true);
        setLoading(false);
      }
      else if (response.status === 500) {
        console.log(response.data.errors[0]);
        setMessagePopupState('Internal Server Error');
        setMessagePopupState(true);
      }
    }
    getUserFeedback();
  }, [])

  const submitUserFeedback = async () => {
    const feedback = {
      eventId,
      userId: user['_id'],
      stars: value,
      comments
    };
    const response = await sendUserFeedback(feedback);
    if (response.status === 200) {
      setMessage('Feedback Submitted Successfully');
      setMessagePopupState(true);
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

  const onCommentsFieldChange = event => {
    setComments(event.target.value);
  }

  return (
    <React.Fragment>
      {loading ? <CircularProgress /> : (
        <>
        {messagePopupState && <MessageComponent open={messagePopupState} messageContent={message} setMessagePopupState={setMessagePopupState}/>}
        <Card>
        <Grid container spacing={3}>
          <div className={classes.ratingStyling}>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  disabled={isFeedbackGiven}
                />
              </Grid>
              <Grid item xs={6}>
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
              </Grid>
            </Grid>
            </div>

          <Grid item xs={12}>
            <div className={classes.textFieldStyling}>
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
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