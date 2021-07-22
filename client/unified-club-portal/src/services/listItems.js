import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BarChartIcon from '@material-ui/icons/BarChart';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to={"/clubs"}>
      <ListItemIcon>
        <GroupSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Clubs" />
    </ListItem>
    <ListItem button component={Link} to={"/club/new"}>
      <ListItemIcon>
        <AddCircleOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="New Club" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountCircleOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="News" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved Items</ListSubheader>
    <ListItem button component={Link} to={"/users/clubs"}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="My Clubs" />
    </ListItem>
    <ListItem button component={Link} to={"/user/events"}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="My Events" />
    </ListItem>
  </div>
);