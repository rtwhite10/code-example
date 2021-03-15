import axios from 'axios'

export function getData() {
  const apiKey = '6022dc053f9eb665a1689373'
  return dispatch => {axios.get('https://sevenfiftyproducts-b8e9.restdb.io/rest/products?limit=25', {headers: {"x-apikey": apiKey}})
    .then((res) => {
      const { data } = res;
      dispatch({
        type: 'ADD_DATA',
        payload: data
      })
    })
  }

}