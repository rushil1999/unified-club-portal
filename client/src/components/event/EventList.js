import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { fetchEventList } from '../../services/eventServices';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Button, CircularProgress } from '@material-ui/core';
import EventCard from './EventCard';
import { useHistory } from 'react-router';
import MessageComponent from '../MessageComponent';
import Typography from '@material-ui/core/Typography';



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
  questionFieldStyling: {
    margin: '0 0 20px 0',
    color: '#009688',
  },
}));


const EventList = props => {
  const classes = useStyles();
  const history = useHistory();
  const { ids } = props;
  const [eventList, setEventList] = useState(); //Array of user Objects
  const [loading, setLoading] = useState(true);
  const [messagePopupState, setMessagePopupState] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetchEventList(ids || []);
      if (response.status === 200) {
        setEventList(response.data.data);
        setLoading(false);
      }
      else if (response.status === 500) {
        console.log(response.data.errors[0]);
        setMessage('Internal Server Error');
        setMessage(true);
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
        <div>
          {messagePopupState && <MessageComponent open={messagePopupState} messageContent={message} setMessagePopupState={setMessagePopupState} />}
          <Card className={classes.card}>
            <CardHeader
              title='Events'
            />
            {eventList.length > 0 ? (
              <List className={classes.root}>
                {eventList.map(event => {
                  return (

                    <ListItem alignItems="flex-start" key={event['_id']}>
                      <Button
                        onClick={() => { redirectToEventData(event['_id']) }}
                      >
                        <EventCard event={event} />
                      </Button>
                    </ListItem>);
                })}
              </List>
            ) : (
              <div className={classes.questionFieldStyling}>
                <Typography component="h5" variant="h5" key="name">
                  Coming soon!
                </Typography>
              </div>
            )}

          </Card>
        </div>)}
    </React.Fragment>
  );
}

export default EventList;
