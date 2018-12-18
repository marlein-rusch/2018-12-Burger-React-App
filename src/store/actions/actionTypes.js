export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

// l. 294.
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

// l. 300
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START'
// l. 297 Order logic into Redux.
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCES';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
// l. 303. Redirect to homepage after purchase.
export const PURCHASE_INIT = 'PURCHASE_INIT'

// l. 305 Fetching orders with Redux
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL'

// l. 315 Authentication
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
//l.320 Logging users out
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
//l.325 Forwarding eenmaal logged in users naar signout page met alle burgeringrediënten
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';