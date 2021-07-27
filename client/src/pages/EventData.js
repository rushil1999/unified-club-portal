import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EventInfo from "../components/event/EventInfo";
import UserList from "../components/user/UserList";
import {
  fetchEventDetails,
  registerUser,
  getEventStatus,
} from "../services/eventServices";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import StarsIcon from "@material-ui/icons/Stars";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../components/auth/ProvideAuth";
import { fetchResource } from "../services/resourceServices";
import { DB_URL } from "../services/constants";
import RatingComponent from "../components/event/RatingComponent";
import Card from "@material-ui/core/Card";
import MessageComponent from "../components/MessageComponent";
import EventFeedbackList from "../components/event/EventFeedbackList";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  image: {
    width: "100%",
    height: "300px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-start",
  },
  enrollButton: {
    marginTop: "5px",
    marginRight: "5px",
    backgroundColor: "purple",
  },
  editButton: {
    marginTop: "5px",
    marginRight: "5px",
    backgroundColor: "darkorange",
    color: "white",
    "&:hover": { color: "black", backgroundColor: "orange" },
  },
  rateEventButton: {
    marginTop: "5px",
    marginRight: "5px",
    backgroundColor: "darkred",
    color: "white",
    "&:hover": { backgroundColor: "red" },
  },
  viewFeedbackButton: {
    marginTop: "5px",
    marginRight: "5px",
    backgroundColor: "purple",
    color: "white",
    "&:hover": { backgroundColor: "indigo" },
  },
  memberSection: {
    width: "50%",
  },
}));

const EventData = props => {
  const contextValue = useContext(AuthContext);
  let { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [eventState, setEventState] = useState();
  const [loading, setLoading] = useState(true);
  const [imagePath, setImagePath] = useState();
  const [eventStatusState, setEventStatusState] = useState();
  const [ratingComponentState, setRatingComponentState] = useState(false);
  const [feedbackComponentState, setFeedbackComponentState] = useState(false);
  const [messagePopupState, setMessagePopupState] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = contextValue;

  useEffect(() => {
    getEventDetails();
    // eslint-disable-next-line
  }, [id]);

  const registerUserToEvent = async () => {
    const response = await registerUser(user["_id"], eventState["_id"]);
    if (response.status === 200) {
      setEventState(response.data.data);
      setMessage("Registered in Event");
      setMessagePopupState(true);
    } else if (response.status === 412) {
      console.log(response.data.message);
      setMessage(response.data.message);
      setMessagePopupState(true);
    } else if (response.status === 500) {
      console.log(response.data.errors);
      setMessage("Internal Server Error");
      setMessagePopupState(true);
    }
  };

  const getEventDetails = async () => {
    setLoading(true);
    const response = await fetchEventDetails(id);
    if (response.status === 200) {
      setEventState(response.data.data);
      setEventStatusState(
        getEventStatus(response.data.data.from, response.data.data.to)
      );
      const { publicFiles } = response.data.data;
      if (publicFiles.length > 0) {
        const resourceResponse = await fetchResource(publicFiles[0]["_id"]);
        if (resourceResponse.status === 200) {
          const { path } = resourceResponse.data.data;
          setImagePath(path);
        } else if (resourceResponse.status === 500) {
          console.log(resourceResponse.data.errors);
          setMessage("Could not fetch File");
          setMessagePopupState(true);
        }
      }
      setLoading(false);
    } else if (response.message) {
      setMessage(response.message);
      setMessagePopupState(true);
    } else {
      console.log(response.errors);
    }
  };

  const redirectToEventForm = () => {
    history.push(`/event/new/${eventState.clubId}/${eventState["_id"]}`);
  };

  const toggleRatingComponentState = () => {
    setRatingComponentState(!ratingComponentState);
  };

  const toggleFeedbackComponentState = () => {
    setFeedbackComponentState(!feedbackComponentState);
  };

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {messagePopupState && (
            <MessageComponent
              open={messagePopupState}
              messageContent={message}
              setMessagePopupState={setMessagePopupState}
            />
          )}
          {imagePath && (
            <>
              <img
                className={classes.image}
                src={`${DB_URL}/${imagePath}`}
                alt="event"
              />
              <br></br>
              <br></br>
            </>
          )}
          <Grid
            container
            justifyContent="center"
            spacing={5}
            alignItems="center"
          >
            <Grid key="club-info" item xs={12}>
              <EventInfo event={eventState} />
            </Grid>
          </Grid>
          <Grid container item className={classes.buttonGroup}>
            {!eventState.participants.includes(user["_id"]) &&
              user.role === "participant" &&
              eventStatusState < 2 && (
                <Button
                  variant="contained"
                  className={classes.enrollButton}
                  onClick={registerUserToEvent}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Register
                </Button>
              )}
            {user.role === "admin" && eventStatusState === -1 && (
              <Button
                variant="contained"
                className={classes.editButton}
                onClick={redirectToEventForm}
                startIcon={<EditSharpIcon />}
              >
                Edit
              </Button>
            )}
            {user.role === "participant" && eventStatusState === 2 && (
              <Button
                variant="contained"
                className={classes.rateEventButton}
                onClick={toggleRatingComponentState}
                startIcon={<StarsIcon />}
              >
                Rate Event
              </Button>
            )}
            {user.role === "admin" && eventStatusState === 2 && (
              <Button
                variant="contained"
                className={classes.viewFeedbackButton}
                onClick={toggleFeedbackComponentState}
                startIcon={<StarsIcon />}
              >
                View Feedbacks
              </Button>
            )}
          </Grid>
          {ratingComponentState && (
            <>
              <br></br>
              <Card>
                <Grid item container>
                  <Grid item xs={12}>
                    <RatingComponent eventId={eventState["_id"]} />
                  </Grid>
                </Grid>
              </Card>
            </>
          )}
          <br></br>
          <Grid
            container
            item
            className={classes.memberSection}
            justifyContent="start"
          >
            <Grid item xs={12}>
              <UserList ids={eventState.participants} titleText="Participants" emptyText="Register Now!" />
            </Grid>
          </Grid>

          {feedbackComponentState && (
            <>
              <br></br>
              <Card>
                <Grid item container>
                  <Grid item xs={12}>
                    <EventFeedbackList eventId={eventState["_id"]} />
                  </Grid>
                </Grid>
              </Card>
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default EventData;
