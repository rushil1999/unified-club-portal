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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { shadows } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px",
    borderRadius: "16px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
}));

const ClubCard = props => {
  const history = useHistory();
  const classes = useStyles();
  const { name, desc, _id } = props.club;

  const redirectToClubsData = () => {
    setTimeout(() => {
      history.push(`/club/${_id}`);
    }, 500);
  };

  return (
    <Box boxShadow={3} className={classes.root}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {name[0]}
            </Avatar>
          }
          title={name}
        />
        <CardMedia
          className={classes.media}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Musical_notes.svg/1280px-Musical_notes.svg.png"
          title="Music"
        />

        <CardContent style={{ textAlign: "left" }}>
          <Typography variant="body2" color="textSecondary" component="p">
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
