import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { fetchEventList } from '../../services/eventServices';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Button, CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const UserList = props => {
  const classes = useStyles();
  const { ids } = props;
  const [eventList, setEventList] = useState(); //Array of user Objects
  const [loading, setLoading] = useState(true);

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
  return (
    <React.Fragment>
      {loading ? <CircularProgress /> : (
      <Card>
        <CardHeader
          title='Events'
        />
        <List className={classes.root}>
          {/* {userList.length} */}
          {eventList.map(user => {
            return(
            <ListItem alignItems="flex-start" key={user['_id']}>
              <Button>
                <ListItemText
                  primary={user.name}
                />
              </Button>
            </ListItem>);
          })}
        </List>
      </Card>)}
    </React.Fragment>
  );
}

export default UserList;
