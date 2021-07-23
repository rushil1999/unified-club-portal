import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const MessageComponent = props => {
  const classes = useStyles();
  const { messageContent, setMessagePopupState } = props;

  const [open, setOpen] = React.useState(props.open);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMessagePopupState(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={messageContent}
      />
    </div>
  );
}


export default MessageComponent;