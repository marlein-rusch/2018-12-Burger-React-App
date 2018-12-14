// l. 299
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false, // set to true once we start ordering
  purchased: false // redirect to homepage
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // l. 303. Redirect to homepage when purchase finished
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGER_START:
    // l. 300. Deze actie is puur aangemaakt om loading op true te zetten,
    // .. zodat we die in ContactData kunnen gebruiken
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
    // l.299 wow dit ging me ff te snel maja
    const newOrder = {
      ...action.orderData,
      id: action.orderId
    }  
    return {
        ...state,
        loading: false,
        // l. 303. Redirect to homepage once burger purchased
        purchased: true,
        // l. 299. concat returns new array, so we add newOrder immutably
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state, 
        loading: false
      }
    default: 
      return state
  }
}

export default reducer;