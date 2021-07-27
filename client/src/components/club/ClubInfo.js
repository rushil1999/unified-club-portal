import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ClubInfo = props => {
  const classes = useStyles();
  const { club } = props;

  return (
    <React.Fragment>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography component="h3" variant="h4" color="primary" key="name">
            {club.name}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            key="desc"
            color="secondary"
            className={classes.pos}
          >
            {club.desc}
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "darkslategrey" }}
            key="memberCapacity"
          >
            Capacity : {club.memberCapacity}
          </Typography>
          <Typography variant="h6" style={{ color: "darkslategrey" }}>
            <i>Enrolled</i> <b>{club.members.length}</b>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ClubInfo;
