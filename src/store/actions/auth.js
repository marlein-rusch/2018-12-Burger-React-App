import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  // used to set a loading state, for a spinner
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      }
    // l. 316. URL van https://firebase.google.com/docs/reference/rest/auth/
    // l. 316. Key aan einde = eigen key: Firebase --> Authentication --> Web Set up (rechtsboven) => apiKey
    // In de documentatie van firebase (de URL hierboven) vindt je ook WAT je moet posten.
    // 1e arg = WAAR we posten, 2e arg = WAT we posten
      axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDCYbKxSyVzB0W101Mtw3iMIaT6sMcIGek', authData)
        .then(response => {
          console.log(response);
          dispatch(authSuccess(response.data))
        })
        .catch(err => {
          console.log(err);
          dispatch(authFail(err))
        })
  };
};