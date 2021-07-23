import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EventCard from './EventCard';
import { useHistory } from 'react-router-dom';
import { fetchEventList } from "../../services/eventServices";
import { Button, CircularProgress } from '@material-ui/core';


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
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
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
      )}
    </div>
  );
}

export default EventGrid;





