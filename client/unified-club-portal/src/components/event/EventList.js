import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { fetchEventList } from '../../services/eventServices';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Button, CircularProgress } from '@material-ui/core';
import EventCard from './EventCard';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
  },
  root: {
    margin: 'auto',
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const EventList = props => {
  const classes = useStyles();
  const { ids } = props;
  const [eventList, setEventList] = useState(); //Array of user Objects
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetchEventList(ids || []);
      if (response.success === true) {
        setEventList(response.data);
        setLoading(false);
      }
      else {
        console.log('Error', response.errors);
      }
    };
    getData();
  }, [ids]);

  const redirectToEventData = id => {
    history.push(`/event/${id}`)
  }

  return (
    <React.Fragment>
      {loading ? <CircularProgress /> : (
      <Card className={classes.card}>
        <CardHeader
          title='Events'
        />
        <List className={classes.root}>
          {eventList.map(event => {
            return (
              
            <ListItem alignItems="flex-start" key={event['_id']}>
              <Button
                onClick={()=>{redirectToEventData(event['_id'])}}
              >
                <EventCard event={event}  />
              </Button>
            </ListItem>);
          })}
        </List>
      </Card>)}
    </React.Fragment>
  );
}

export default EventList;
