import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import {
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { isBlank, isEmpty } from '../services/validationFunctions';
import { createNewClub } from '../services/clubServices';
import { useHistory } from 'react-router-dom';


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
}));



const ClubForm = props => {
  const history = useHistory();
  const classes = useStyles();

  const [clubState, setClubState] = useState({
    name: '',
    desc: '',
    memberCapacity: 0,
    clubType: '',
    members: [],
    otheClubType: ''
  })

  const formChangeHandler = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setClubState({ ...clubState, [fieldName]: fieldValue });
  }

  const formSubmitHandler = async event => {
    const { name, desc, memberCapacity, clubType, members, otherClubType } = clubState;
    let finalClubType;
    if((isBlank(clubType) || isEmpty(clubType)) && otherClubType !== ''){
      finalClubType = otherClubType;
    }
    else{
      finalClubType = clubType;
    }
    const club = {
      name, 
      desc, 
      memberCapacity, 
      clubType: finalClubType,
      members
    };
    const response = await createNewClub(club);
    if(response.ok){
      window.alert('Club Creation Successfull');
      console.log('Club Creation successfull');
    }
    else{
      console.log(response.errors);
    }
  }
  const redirectToDashboard = () => {
    setTimeout(()=>{
      history.push('/dashboard');
    }, 500);
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography component="h1" variant="h4" align="center">
              New Club
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Club Name"
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
                  name="memberCapacity"
                  label="Member Capacity"
                  fullWidth
                  autoComplete="shipping address-line2"
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12} >
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={clubState.clubType}
                    onChange={formChangeHandler}
                    name="clubType"
                    className={classes.formControl}
                  >
                    <MenuItem value={"Work"}>Work</MenuItem>
                    <MenuItem value={"Fun"}>Fun</MenuItem>
                    <MenuItem value={"Sports"}>Sports</MenuItem>
                    <MenuItem value={"Music"}>Music</MenuItem>
                    <MenuItem value={"Love"}>Love</MenuItem>
                    <MenuItem value={"SelfImprov"}>Self Improvment</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                  {clubState.otherClubType === "Other" ? (
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      value={clubState.otherCategory}
                      name="otherClubType"
                      label="Catogory"
                      id="other cateogry"
                      required
                    />
                  ) : null}
                </FormControl>
              </Grid>
              </Grid>
              </CardContent>
              <CardActions>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained"
                  onClick={redirectToDashboard}
                >
                  Back to Dashboard
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={formSubmitHandler}>
                  Create
                </Button>
              </Grid>
              </CardActions>
          
        </Card>
      </main>

    </React.Fragment>
  );
}


export default ClubForm;