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
export const purchaseBurger = (orderData) => {
  // return a function where we get the dispatch function (this is thunk doing its shit)
  return dispatch => {
    // l.300. De DISPATCH is nodig to dispatch to the Redux store
    dispatch(purchaseBurgerStart());
    // second argument 'orderData' is the data that gets sent
    axios.post('/orders.json', orderData)
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