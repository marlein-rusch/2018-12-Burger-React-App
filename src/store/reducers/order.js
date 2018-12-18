// l. 299
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false, // set to true once we start ordering
  purchased: false // redirect to homepage
}

// l. 307 Refactoring reducer: heb ik NIET toegepast!
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
    // l. 305. Fetching orders in redux
    case actionTypes.FETCH_ORDERS_START:
      // l. 307. Refactoring reducer: niet gedaan BEHALVE hier ter vb
      return updateObject(state, {loading: true })
      // l. 307. Refactoring reducer, oude code:
      // return {
      //   ...state,
      //   loading: true
      // }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        // l. 305: even it it fails, the loading is done (so false)
        loading: false
      }
    default: 
      return state
  }
}

export default reducer;