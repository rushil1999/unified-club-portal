import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { fetchUserList } from '../../services/userServices';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    borderRadius: '10px',
    padding: '15px',
    borderStyle: 'ridge',
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: red[500],
  },
  listItem: {
    padding: '12px'
  }
}));


const UserList = props => {
  const classes = useStyles();
  const { ids } = props;
  const [userList, setUserList] = useState(); //Array of user Objects
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const response = await fetchUserList(ids || []);
      if (response.success === true) {
        setUserList(response.data);
        setLoading(false);
      }
      else {
        console.log('Error', response.errors);
      }
    };
    getUser();
  }, [ids]);
  return (
    <React.Fragment>
      {loading ? <CircularProgress /> : (
        <Card className ={classes.listItem}>
          <CardHeader
            title='Members / Participants'
          />
          
          <List  >
            {/* {userList.length} */}
            {userList.map(user => {
              return (
                <div >
                  <ListItem className={classes.root} alignItems="flex-start" key={user['_id']}>
                    <ListItemAvatar>
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {user.name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                    />
                  </ListItem>
                  </div>);
            })}
          </List>
        </Card>)}
    </React.Fragment>
  );
}

export default UserList;
