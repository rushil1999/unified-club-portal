import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import '../styles/styles.css';

const LandingPage = props => {
  return (
    <div id="main">
      <Typography variant="h1" align="center" style={{ color: "black" }}>
        Unified Club Portal
      </Typography>
      <Typography variant="h5" align="center" style={{ marginTop: "10px" }}>
        Simple tool to organize clubs and events
      </Typography>
      <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary" style={{ backgroundColor: "black", margin: '5px' }} href="/signin">
            Sign In
          </Button>
          <Button variant="contained" color="primary" style={{ backgroundColor: "darkgreen", margin: '5px' }} href="/signup">
            Sign Up!
          </Button>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default LandingPage;