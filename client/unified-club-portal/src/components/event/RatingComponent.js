import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import { AuthContext } from '../auth/ProvideAuth';
import { getUserFeedbackForEvent } from '../../services/eventServices';


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
    width: 200,
    display: 'flex',
    alignItems: 'center',
    height: 500,
  },
  addHeight: {
    height: 300
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
  const { submitUserFeedback, eventId } = props;
  const {user} = contextValue;

  useEffect(() => {
    const getUserFeedback = async () =>{
      setLoading(true);
      const response = await getUserFeedbackForEvent(user['_id'], eventId);
      if(response.success){
        const {stars, comments} = response.data;
        setValue(stars);
        setComments(comments);
        setIsFeedbackGiven(true);
        setLoading(false);
      }
      else{
        console.log(response);
        setMessagePopupState(response.errors[0]);
        setMessagePopupState(true);
      }
    }
    getUserFeedback();
  },[])
  
  const sendFeedback = () => {
    console.log({
      stars: value,
      comments
    })
    submitUserFeedback({
      stars: value,
      comments
    });
  }

  const onCommentsFieldChange = event => {
    setComments(event.target.value);
  }

  return (
    <Grid container spacing={3}>
      <Card>
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
      </Card>

      <Grid item xs={12}>
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
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={sendFeedback}
        >
          Submit Feedback
        </Button>
      </Grid>


    </Grid>
  );
}
export default RatingComponent;