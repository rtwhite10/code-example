import { makeStyles, Breadcrumbs, Typography, Link, Grid, Container, Box } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { getData } from './redux/actions/actions';
import Beverages from './views/Beverages';
import Header from './components/Header';


const useStyles = makeStyles({
  root: {
  },
  container: {
    margin: '4rem 0'
  },
  gridItem: {
    padding: '0'
  }
})

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(getData())
  },[])

  return (
    <div>
      <Header />
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Grid container direction="column" spacing={6} className={classes.container}>
            <Grid item className={classes.gridItem}>
              <Beverages />
            </Grid>
            <Grid item className={classes.gridItem}>
            <Breadcrumbs>
              <Link color="inherit">
                  home
              </Link>
              <Link color="inherit">
                  products
              </Link>
              <Typography color="textPrimary">BevMor product quicksearch</Typography>
            </Breadcrumbs>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default App;
