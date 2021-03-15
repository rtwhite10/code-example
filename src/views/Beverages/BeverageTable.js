import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AppContext } from '.';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles({
  root: {
  },
  container: {
    height: '500px'
  },
  searchContainer: {
    width: '100%',
    margin: '1rem 0',
    paddingTop: '.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchField: {
    marginRight: '8px'
  },
  icon: {
    marginLeft: '8px'
  }
});


export default function BeverageTable() {
  const [filterPosition, setFilterPosition] = React.useState({
    abv: 'asc',
    vintage_year: 'asc'
  })
  const { beverageList, handleTableSearch, handleFilterTableOrder } = React.useContext(AppContext);
  const classes = useStyles();

  React.useEffect(() => {console.log(beverageList)}, [beverageList])

  const handleFilterPosition = (type) => {
    const filterType = filterPosition[type] === 'asc' ? 'desc' : 'asc'

    setFilterPosition(state => ({
      ...state,
      [type]: filterType
    }))

    handleFilterTableOrder(filterType, type)
  }

  return (
    <Paper className={classes.root}>
      <Box className={classes.searchContainer}>
      <Typography className={classes.icon} variant="body1">
      🍾 Quick Search tool
      </Typography>
      <TextField
        className={classes.searchField}
        id="input-with-icon-textfield"
        placeholder="search by name"
        onChange={(e) => handleTableSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      </Box>
    <TableContainer component={Paper} className={classes.container}>
      <Table stickyHeader aria-label="beverage table list">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => handleFilterPosition('abv')}>
                { filterPosition.abv === 'asc'? <ArrowDownwardIcon /> : <ArrowUpwardIcon /> }
              </IconButton>
                Abv
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={() => handleFilterPosition('vintage_year')}>
                { filterPosition.vintage_year === 'asc'? <ArrowDownwardIcon /> : <ArrowUpwardIcon /> }
              </IconButton>
               Vintage Year
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {beverageList.map((row) => (
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
    </TableContainer>
    </Paper>
  );
}