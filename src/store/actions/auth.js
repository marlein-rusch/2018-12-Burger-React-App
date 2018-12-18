import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  // used to set a loading state, for a spinner
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  // l. 326 Local Storage
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

// l.320 --> Log out when hour has passed
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      // Always execute these functions, because that then
      // (..) the action that is actually dispatched.
      dispatch(logout())
    }, expirationTime * 100);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    // l. 317. Adding sign-in (versch acties n.a.v. 'isSignup' value)
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDCYbKxSyVzB0W101Mtw3iMIaT6sMcIGek'
    // l. 318. Ook deze URL komt van firebase documentation (part 'sign in', zie link hieronder)
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDCYbKxSyVzB0W101Mtw3iMIaT6sMcIGek'
    }
    // l. 316. URL van https://firebase.google.com/docs/reference/rest/auth/
    // l. 316. Key aan einde = eigen key: Firebase --> Authentication --> Web Set up (rechtsboven) => apiKey
    // In de documentatie van firebase (de URL hierboven) vindt je ook WAT je moet posten.
    // 1e arg = WAAR we posten, 2e arg = WAT we posten
      axios.post(url, authData)
        .then(response => {
          console.log(response);
          // l. 326 * 1000 because Date works in milliseconds
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
          // l. 326. Localstorage is built into javascript.
          // l. 326 Set item is something we can call on localStorage.
          // l. 326 Second argument is the actual token
          // l. 326 Chrome Devtools -> Application tab -> Local Storage
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userId', response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId))
          dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
          console.log(err);
          // l. 319. Addding error message.
          // It's axios that wraps the response in the error object (maakt nl niet uit hoe we die response noemen)
          dispatch(authFail(err.response.data.error))
        })
  };
};

// l. 325 Redirected the User to the checkout page

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

// l. 326. Local Storage
// Utility action creator which dispatches a couple of other 
// .. actions depending on our curren state. It's not async.

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Shouldn't be required but just to be sure
      // Als er geen token in storage zit hoor je niet ingelogd te zijn
      dispatch(logout())
    } else {
      // We need a Date object, not a string 
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        // getTime gets us the time in milliseconds
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  };
};