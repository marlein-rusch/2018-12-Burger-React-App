// l. 297

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// 'id' will be nr that was created by firebase
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    // l. 297 We could merge orderId and orderData together, but we just don't
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    // l. 297 we pass on the error since we got it
    error: error
  }
}
// l. 300
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}


// l. 297 The action we dispatch from the container once we click that order-button
// l. 321 Authentication: added second argument (token)
export const purchaseBurger = (orderData, token) => {
  // return a function where we get the dispatch function (this is thunk doing its shit)
  return dispatch => {
    // l.300. De DISPATCH is nodig to dispatch to the Redux store
    dispatch(purchaseBurgerStart());
    // second argument 'orderData' is the data that gets sent
    axios.post('/orders.json?auth=' + token, orderData)
    // l. 173 purchasing: false zorgt ervoor dat de modal closes
    .then(response => {
      console.log('Actions --> [order.js], response.data: ', response.data)
        /*
        // OLD CODE toen het nog in ContactData orderHandler zat
        this.setState({loading: false }); 
        // l.178. History object beschikbaar doordat we props via de render method hebben
        // .. meegegeven onderaan in de checkout component. 
        this.props.history.push('/')
        */
       // .name moet erbij, want in firebase wordt de gegenereerde ID nou eenmaal onder 'name' gezet
       dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch(error => {
        // this.setState({loading: false })//  OLD
        dispatch(purchaseBurgerFail(error));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}
// l. 305. Fetching (all) orders via Redux
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

// l. 321 token argument toegevoegd voor authentication
export const fetchOrders = (token) => {
  return dispatch => {
    // l. 305. Deze ..Start() dispatch is om de spinner te laten zien
    dispatch(fetchOrdersStart())
    // l. 321 Authentication: add token as query param to have access to orderlist
    axios.get('/orders.json?auth=' + token)
    // l.305. Deze transformation kan ook in de reducer, Max prefers in action creator
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push(
          {...res.data[key],
          // key (de property key) is gewoon het nr gecreëerd door firebase,
          id: key
        });
      }      
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err))
    });
  }
};
