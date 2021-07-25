import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { labels } from '../../services/constants';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  card: {
    display: "flex",
    border: "1px solid #ddd",
    margin: "10px 5px",
    boxShadow: "none",
  },
  cardDetails: {
    flex: 1,
    display: "flex",
    textAlign: "left",
    justifyContent: "flex-start",
  },
  cardMedia: {
    width: 250,
  },
  cardAction: {
    "&hover": {
      backgroundColor: "transparent",
    }
  },
  ratingValue: {
    margin: '18px',
    color: '#795548'
  },
  width: {
    width: '350px',
  }
});

const FeedbackCard = props => {
  const classes = useStyles();
  const { feedback } = props;
  const { stars, comments } = feedback;
  return (
    <Grid item>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <div className={classes.ratingValue}>
              <Typography component="h2" variant="h5" >
                {labels[stars]}
              </Typography>
            </div>
            <div className={classes.width}>
              <TextField
                id="outlined-multiline-static"
                label="Additional Comments"
                multiline
                rows={4}
                value={comments}
                variant="outlined"
                name="comments"
                disabled={true}
              />
            </div>
          </CardContent>
        </div>
        {/* <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/zoom-background%2C-event%2Cpresentation-design-template-69f11bda0c4d7c9ccb155035a05493d9_screen.jpg?ts=1598358685"
              title={'Event Rating'}
            />
          </Hidden> */}
      </Card>
    </Grid>
  );
}

export default FeedbackCard;