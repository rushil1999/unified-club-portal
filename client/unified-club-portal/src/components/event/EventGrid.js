import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EventCard from './EventCard';
import { useHistory } from 'react-router-dom';
import { fetchEventList } from "../../services/eventServices";
import { Button, CircularProgress } from '@material-ui/core';
import MessageComponent from "../MessageComponent";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    control: {
      padding: theme.spacing(2),
    },
    grid_card: {
      padding: '10px'
    }
  }),
);

const EventGrid = props => {
  const styles = useStyles();
  const { ids } = props;
  const [eventList, setEventList] = useState(); //Array of user Objects
  const [loading, setLoading] = useState(true);
  const [messagePopupState, setMessagePopupState] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetchEventList(ids || []);
      if (response.status === 200) {
        setEventList(response.data.data);
        setLoading(false);
      }
      else if(response.status === 500){
        console.log('Error', response.data.errors);
        setMessage('Internal Server Error');
        setMessagePopupState(true);
      }
    };
    getData();
  }, [ids]);

  const redirectToEventData = id => {
    history.push(`/event/${id}`)
  }

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
        {messagePopupState && <MessageComponent open={messagePopupState} messageContent={message} setMessagePopupState={setMessagePopupState}/>}
        <div>
          <Grid
            key="outerGrid"
            className={styles.root}
            container justify="center"
          >
            {eventList.map((event) => {
              return (
                <Grid key={`innerGrid-${event['_id']}`} item xs={12} md={6}>
                  <div className={styles.grid_card}
                    key={event.id}
                  >
                    <Button
                      onClick={() => { redirectToEventData(event['_id']) }}
                    >
                      <EventCard event={event} onClick={() => { redirectToEventData(event['_id']) }} />
                    </Button>

                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
        </>
      )}
    </div>
    
  );
}

export default EventGrid;





