import axios from 'axios'
const k = '6022dc053f9eb665a1689373'

export function getData() {
  return dispatch => {axios.get(`https://sevenfiftyproducts-b8e9.restdb.io/rest/products?max=25`, {headers: {"x-apikey": k}})
    .then((res) => {
      const { data } = res;
      dispatch({
        type: 'ADD_DATA',
        payload: data
      })
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    })
  }
}

export function filterData(data) {
  return dispatch => {axios.get(`https://sevenfiftyproducts-b8e9.restdb.io/rest/products?filter=${data}&max=25`, {headers: {"x-apikey": k}})
    .then((res) => {
      const { data } = res;
      dispatch({
        type: 'ADD_DATA',
        payload: data
      })
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    })
  }
}


export function sortData(column, dir) {
  
  return dispatch => {axios.get(`https://sevenfiftyproducts-b8e9.restdb.io/rest/products?sort=${column}&dir=${dir}&max=25`, {headers: {"x-apikey": k}})
    .then((res) => {
      const { data } = res;
      dispatch({
        type: 'ADD_DATA',
        payload: data
      })
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    })
  }
}

export function sortDataWithQuery(query, column, dir) {
  return dispatch => {axios.get(`https://sevenfiftyproducts-b8e9.restdb.io/rest/products?filter=${query}&sort=${column}&dir=${dir}&max=25`, {headers: {"x-apikey": k}})
    .then((res) => {
      const { data } = res;
      dispatch({
        type: 'ADD_DATA',
        payload: data
      })
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    })
  }
}

export function setDataLoading() {
  return {
    type: 'SET_LOADING'
  }
}