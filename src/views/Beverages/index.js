import { Box, CircularProgress, Container, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { ContextDevTool } from 'react-context-devtool';
import { useSelector } from 'react-redux';
import BeverageTable from './BeverageTable';

const useStyles = makeStyles({
  container: {
    width: '800px'
  },
  spinnerContainer: {
    height: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export const AppContext = React.createContext();

const initialLocalState = {
  beverageList:[]
}

const localReducer = (state, action) => {
  switch(action.type) {
    case'ADD_BEVERAGE_DATA':
      return {
        ...state,
        beverageList: action.payload
      }
    case'SEARCH_TABLE':{
      const {filteredList, value} = action.payload
      const queriedTable = filteredList.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
      return {
        ...state,
        beverageList: value === '' ? filteredList : queriedTable
      }
    }
    case 'CHANGE_ORDER': {
      const { direction, column } = action.payload;
      const orderedTable = state.beverageList.sort((a,b) => direction === 'asc' ? (a[column] - b[column]) : (b[column] - a[column]))
      return {
        ...state,
        beverageList: orderedTable
      }
    }
    default: 
      return state
  }
}

export default function Beverages() {
  const [localState, localDispatch] = React.useReducer(localReducer, initialLocalState);
  const {beverageData} = useSelector(state => state.data);
  const filteredList = beverageData && beverageData.filter((item, index) => index < 25);
  const classes = useStyles();

  React.useEffect(() => {
    localDispatch({type: 'ADD_BEVERAGE_DATA', payload: filteredList})
  },[beverageData])

  const handleTableSearch = (value) => {
    console.log('fired')
    localDispatch({type: 'SEARCH_TABLE', payload: {filteredList, value}})
  } 
  
  const handleFilterTableOrder = (direction, column) => {
    localDispatch({type: 'CHANGE_ORDER', payload: {direction, column}})
  }

  return (
   <AppContext.Provider value={{
     beverageList: localState.beverageList,
     handleTableSearch,
     handleFilterTableOrder
   }}>
     <ContextDevTool context={AppContext} id="AppContext" displayName="AppContext" />
    
      {localState.beverageList 
        ? <BeverageTable/>
        : (
            <Box className={classes.spinnerContainer}> 
              <CircularProgress />
            </Box>
          )
      }
   </AppContext.Provider>
  )
}