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

const EventInfo = props => {
  const classes = useStyles();
  const { event } = props;

  const { name, desc,capacity, from, to, status } = event;
  const startDate = new Date(from);
  const startDateString = `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()} ${startDate.getHours()}:${startDate.getMinutes()}`;

  const toDate = new Date(to);
  const toDateString = `${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()} ${toDate.getHours()}:${toDate.getMinutes()} `
  
  return (
    <React.Fragment>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1" key="name">
            {name}
          </Typography>
          <Typography variant="body2" component="p" key="desc" className={classes.pos}>
            {desc}
          </Typography>
          <Typography variant="body2" component="p" key="memberCapacity">
            Capacity : {capacity}
          </Typography>
          <Typography variant="body2" component="p" key="startDate">
            Start Date : {startDateString}
          </Typography>
          <Typography variant="body2" component="p" key="endDate">
            End Date : {toDateString}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default EventInfo;