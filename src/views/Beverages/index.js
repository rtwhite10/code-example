import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useDispatch, useSelector } from 'react-redux';
import { filterData, setDataLoading, sortData, sortDataWithQuery } from '../../redux/actions/actions';

const useStyles = makeStyles({
  root: {
  },
  container: {
    height: '500px'
  },
  headerContainer: {
    width: '100%',
    margin: '1rem 0',
    paddingTop: '.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 1rem',
  },
  spinnerContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchField: {
    marginRight: '8px'
  },
  icon: {
    marginLeft: '8px'
  },
  button: {
    height: '30px'
  }
});


export default function BeverageTable() {
  const [filterPosition, setSortDirection] = React.useState({
    abv: -1,
    vintage_year: -1
  })
  const [query, setQuery] = React.useState('')
  const {beverageData, loading} = useSelector(state => state.data);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleColumnSort = (column) => {
    const sortDirection = filterPosition[column] === -1 ? 1 : -1

    if (query !== '') {
      dispatch(setDataLoading())
      dispatch(sortDataWithQuery(query, column, sortDirection))
    } else {
      dispatch(setDataLoading())
      dispatch(sortData( column, sortDirection))
    }

    setSortDirection(state => ({
      ...state,
      [column]: sortDirection
    }))
  }

  const handleDataFilter = () => {
    dispatch(setDataLoading())
    dispatch(filterData(query))

    setSortDirection({
      abv: -1,
      vintage_year: -1
    })
  }

  return (
    <Paper className={classes.root}>
      <Box className={classes.headerContainer}>
      <Typography className={classes.icon} variant="body1">
      🍾 Quick Search tool
      </Typography>
      <Box className={classes.searchContainer}>
      <TextField
        className={classes.searchField}
        id="input-with-icon-textfield"
        placeholder="search by name"
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary"/>
            </InputAdornment>
          ),
        }}
      />
      <Button className={classes.button} color="primary" variant="contained" onClick={() => handleDataFilter()}>Search</Button>
      </Box>
      </Box>
      <TableContainer component={Paper} className={classes.container}>
        { !loading && beverageData ? (
          <Table stickyHeader aria-label="beverage table list">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleColumnSort('abv')}>
                  { filterPosition.abv === 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon /> }
                </IconButton>
                  Abv
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleColumnSort('vintage_year')}>
                  { filterPosition.vintage_year === 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon /> }
                </IconButton>
                Vintage Year
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beverageData.map((row) => (
              <TableRow key={`${row.name}${row.id}`}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.abv}</TableCell>
                <TableCell align="right">{row.vintage_year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
      : ( 
        <Box className={classes.spinnerContainer}> 
          <CircularProgress />
        </Box>
        )
      }
    </TableContainer>
    </Paper>
  );
}