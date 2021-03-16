
const initialState = {
  data: null,
  loading: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_DATA':{ 
      return {
        ...state,
        beverageData: action.payload,
        loading: false
      }}
      case 'ERROR':{ 
        return {
          ...state,
          error: action.payload,
          loading: false
        }}
      case 'SET_LOADING':
        return {
          ...state,
          loading: true
        }
    default: 
      return state;
  }
}