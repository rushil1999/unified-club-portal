import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px",
    borderRadius: "16px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    "&:hover": {
      cursor: "pointer"
    },
  },
  go_to: {
    marginLeft: "auto",
    border: "1px solid darkgrey",
    color: "darkblue",
  },
  avatar: {
    backgroundColor: red[500],
    marginRight: "0",
  },
  title: {
    display: "flex",
  }
}));

const ClubCard = props => {
  const history = useHistory();
  const classes = useStyles();
  const { name, desc, _id, clubType } = props.club;

  const redirectToClubsData = () => {
    setTimeout(() => {
      history.push(`/club/${_id}`);
    }, 500);
  };

  let mediaImage = '';
  switch(clubType){
    case 'Music':
        mediaImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Musical_notes.svg/1280px-Musical_notes.svg.png';
        break;
    case 'Sports':
      mediaImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1200px-Sport_balls.svg.png';
      break;
    case 'SelfImprov':
      mediaImage = '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjZfVulolQIcCtP-m2OpHUW90cHenKKY8byg&usqp=CAU';
      break;
    case 'Fun':
      mediaImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMvw26w2i8FfL7_Kr4tZ3CqBOXHLVovHyJDQ&usqp=CAU';
      break;
    default: 
      mediaImage = 'https://thumbs.dreamstime.com/z/neon-sign-word-club-dark-background-background-your-design-greeting-card-banner-neon-sign-word-club-dark-150811899.jpg';
      break; 
  }

  
  
  return (
    <Box className={classes.root}>
      <Card>
        <CardHeader
          classes={{ title: classes.title}}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {name[0]}
            </Avatar>
          }
          title={name}
        />
        <CardMedia
          className={classes.media}
          image={mediaImage}
          title="Club"
          onClick={redirectToClubsData}
        />

        <CardContent style={{ textAlign: "left" }}>
          <Typography variant="h6" color="textSecondary" component="p">
            {desc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="go to club"
            className={classes.go_to}
            color="secondary"
            size="medium"
            onClick={redirectToClubsData}
          >
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ClubCard;
