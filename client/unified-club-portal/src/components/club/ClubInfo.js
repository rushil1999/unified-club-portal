import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
          <Typography variant="h5" component="h2" key="name">
            {club.name}
          </Typography>
          <Typography variant="body2" component="p" key="desc">
            {club.desc}
          </Typography>
          <br></br>
          <Typography variant="body2" component="p" key="memberCapacity">
            Member Capacity :{club.memberCapacity}
          </Typography>
          <br></br>
          <Typography variant="body2" component="p" key="membetsEnrolled">
            Members Enrolled :{club.members.length}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>

  );

}

export default ClubInfo;