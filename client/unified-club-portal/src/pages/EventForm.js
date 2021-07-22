import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory, useParams } from 'react-router-dom';
import { createNewEvent } from '../services/eventServices';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  root: {
    minWidth: 275,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  input: {
    display: 'none',
  },
}));



const EventForm = props => {
  const history = useHistory();
  const classes = useStyles();
  let { clubId } = useParams();

  const [eventState, setEventState] = useState({
    name: '',
    desc: '',
    capacity: 0,
    participants: [],
    to: null,
    from: null,
    eventPoster: null,
  });
  const [errorState, setErrorState] = useState({
    name: '',
    desc: '',
    capacity: '',
    to: '',
    from: '',
    eventPoster: ''
  });

  const [image, setImage] = useState(null);

  const formChangeHandler = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    if (fieldName === 'to') {
      if (eventState['from']) {
        const toTimeStamp = new Date(eventState['to']).getTime();
        const fromTimeStamp = new Date(eventState['from']).getTime();
        if (toTimeStamp < fromTimeStamp) {
          setErrorState({ ...errorState, to: 'Date must be after start date' });
        }
        else {
          setErrorState({ ...errorState, to: '' })
        }
      }
      else {
        setErrorState({ ...errorState, to: 'Fill in Start Date first' });
      }
    }
    setEventState({ ...eventState, [fieldName]: fieldValue });
  }

  const formChangeHandlerForImage = event => {
    console.log(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setEventState({ ...eventState, eventPoster: event.target.files[0] })
  }

  const formSubmitHandler = async event => {
    const { name, desc, capacity, participants, to, from, eventPoster } = eventState;
    const clubEvent = {
      name,
      desc,
      capacity,
      participants,
      to,
      from,
      clubId,
      eventPoster
    };
    const response = await createNewEvent(clubEvent);
    if (response.success === true) {
      window.alert('Event Creation Successfull');
      console.log('Event Creation successfull');
      redirectToClub();
    }
    else {
      console.log(response.errors);
    }
  }
  const redirectToClub = () => {
    setTimeout(() => {
      history.push(`/club/${clubId}`);
    }, 500);
  }

  const isFormValid = () => {
    for (const key in errorState) {
      if (errorState[key] !== '') {
        return false;
      }
    }
  }

  const clearImage = () => {
    setImage(null);
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography component="h1" variant="h4" align="center">
              New Event
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Event Name"
                  fullWidth
                  autoComplete="given-name"
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="desc"
                  name="desc"
                  label="Description"
                  fullWidth
                  autoComplete="shipping address-line1"
                  onChange={formChangeHandler}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="capacity"
                  name="capacity"
                  label="Capacity"
                  fullWidth
                  autoComplete="shipping address-line2"
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  label="Start Date"
                  name="from"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  label="End Date"
                  name="to"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formChangeHandler}
                  error={!!errorState['to']}
                  helperText={errorState['to']}
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="eventPoster"
                  onChange={formChangeHandlerForImage}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                  >
                    Upload Event Poster
                  </Button>
                </label>
              </Grid>
              {image && (
                <React.Fragment>
                  <Grid item xs={12}>
                    <IconButton 
                      aria-label="delete" 
                      className={classes.margin}
                      onClick={clearImage}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <img src={image} alt="Form" />
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </CardContent>
          <CardActions>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                onClick={redirectToClub}
              >
                Back to Dashboard
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={formSubmitHandler}
                disabled={isFormValid()}
              >

                Create
              </Button>
            </Grid>
          </CardActions>

        </Card>
      </main>
    </React.Fragment>
  );
}


export default EventForm;