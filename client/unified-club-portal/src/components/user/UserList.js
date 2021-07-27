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
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '250px',
    backgroundColor: theme.palette.background.paper,
    margin: '10px',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    display: 'inline-flex',
    alignItems: 'center'
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: red[500],
  },
  listItem: {
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
  },
  questionFieldStyling: {
    margin: '0 0 20px 0',
    color: '#009688',
  },
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
            title={props.titleText}
          />
          {userList.length > 0 ? (
            <List>
            {userList.map(user => {
              return (
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
                );
            })}
          </List>
          ): (
            <div className={classes.questionFieldStyling}>
                <Typography component="h5" variant="h5" key="name">
                  {props.emptyText}
                </Typography>
              </div>
          )}
          
        </Card>)}
    </React.Fragment>
  );
}

export default UserList;
