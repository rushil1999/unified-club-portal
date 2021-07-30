import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import '../styles/styles.css';

const LandingPage = props => {
  return (
    <div id="main">
      <Typography variant="h3" align="center" style={{ color: "#2196F3" }}>
        Unified Club Portal
      </Typography>
      <Typography variant="h5" align="center" style={{ marginTop: "40px" }}>
        Simple tool to organize clubs and events
      </Typography>
      <div style={{ width: "50%", margin: "0 auto", marginTop: "40px" }}>
        <Grid container spacing={2} align="center" >
          <Grid item xs={4} >

          </Grid>
          <Grid item xs={2} >
            <Button variant="raised" color="primary" style={{ backgroundColor: "#2196F3" }}>
              Login
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button variant="raised" color="primary" style={{ backgroundColor: "#2196F3" }}>
              Signup
            </Button>
          </Grid>
          <Grid item xs={4} >

          </Grid>
        </Grid>
      </div>

    </div>
  );
}

export default LandingPage;