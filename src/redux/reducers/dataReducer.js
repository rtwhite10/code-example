
const initialState = {
  data: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_DATA':{ 
      console.log(action.payload)
      return {
        ...state,
        beverageData: action.payload
      }}
    default: 
      return state;
  }
}