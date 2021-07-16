import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { fetchClubList } from "../services/clubServices";
import ClubCard from '../components/club/ClubCard';

export default function BoxGrid() {
  const [clubList, setClubList] = useState([]);
  const [loading, setLoading] = useState(true);

  const useStyles = makeStyles((theme) =>
    createStyles({
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
      grid_card: {
        padding: 10
      }
    }),
  );
  const styles = useStyles();


  useEffect(() => {
    async function getClublist() {
      const response = await fetchClubList();
      if (response && response.data) {
        setClubList(response.data);
        setLoading(false);
      }
    }
    getClublist();
  }, []);

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
            {clubList.map((club) => {
              return (
                <Grid key={`innerGrid-${club['_id']}`} item>
                  <div className = {styles.grid_card}
                    key={club.id}
                  >
                    <ClubCard club={club} />
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





