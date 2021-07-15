import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  go_to: {
    marginLeft: 'auto'
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ClubCard = props => {
  const history = useHistory();
  const classes = useStyles();
  const {name, desc, _id } = props.club;


  const redirectToClubsData = () => {
    setTimeout(() => {
      history.push(`/club/${_id}`);
    }, 500);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            C
          </Avatar>
        }
        title={name}
      />
      <CardMedia
        className={classes.media}
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Musical_notes.svg/1280px-Musical_notes.svg.png"
        title="Music"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton 
          aria-label="go to club" 
          className={classes.go_to}
          onClick={redirectToClubsData}
        >
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ClubCard;