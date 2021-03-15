import { AppBar, Breadcrumbs, Container, Link, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Container maxWidth="lg" >
        <Toolbar disableGutters className={classes.root}>
        <Typography variant="h6" style={{paddingLeft: '16px'}}> 🍷BevMor</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}