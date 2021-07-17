import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ClubInfo = props => {
  const classes = useStyles();
  const { club } = props;


  return (
    <React.Fragment>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1" key="name">
            {club.name}
          </Typography>
          <Typography variant="body2" component="p" key="desc" className={classes.pos}>
            {club.desc}
          </Typography>
          <Typography variant="body2" component="p" key="memberCapacity">
            Capacity :{club.memberCapacity}
          </Typography>
          <Typography variant="body2" component="p" key="membetsEnrolled">
            Enrolled :{club.members.length}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>

  );

}

export default ClubInfo;