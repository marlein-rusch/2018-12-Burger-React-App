//. 318
import * as actionTypes from '../actions/actionTypes';
import { updateObject} from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  // l. 325. Forwarding eenmaal authenticated users met juiste burger ingr.
  // By default just a slash, to redirect to the root page.
  authRedirectPath: '/' 
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true});
};

const authSuccess = (state, action) => {
  return updateObject( state, {
    token: action.idToken,
    userId: action.userId,
    error: null, 
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

// l. 320. Logging users out
const authLogOut = (state, action) => {
  return updateObject(state, {token: null, userId: null});
}

// l. 325 Redirecting the user to the checkout page
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {authRedirectPath: action.path});
}

const reducer = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state,action);
    case actionTypes.AUTH_LOGOUT: return authLogOut(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default:
      return state
    }
}

export default reducer;