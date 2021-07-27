import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/auth/ProvideAuth';


export const MainListItems = props => {
  const context = useContext(AuthContext);
  const { user } = context;

  return (
    <div>
      <ListItem button component={Link} to={"/clubs"}>
        <ListItemIcon>
          <GroupSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Clubs" />
      </ListItem>
      {user.role === 'admin' && (
      <ListItem button component={Link} to={"/club/form/new"}>
        <ListItemIcon>
          <AddCircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="New Club" />
      </ListItem>)}
      {user.role === 'participant' && (
        <ListItem button component={Link} to={"/user/events"}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="My Events" />
        </ListItem>
      )}

      {/* <ListItem button>
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
    </ListItem> */}
    </div>
  )
};

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved Items</ListSubheader> */}
    {/* <ListItem button component={Link} to={"/users/clubs"}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="My Clubs" />
    </ListItem> */}
    {/* <ListItem button component={Link} to={"/user/events"}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="My Events" />
    </ListItem> */}
  </div>
);