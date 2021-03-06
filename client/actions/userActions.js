import fetch from 'isomorphic-fetch';
/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_RESPONSE = 'USER_GET_RESPONSE';

export const USER_POST_REQUEST = 'USER_POST_REQUEST';
export const USER_POST_RESPONSE = 'USER_POST_RESPONSE';

export const USER_PUT_REQUEST = 'USER_PUT_REQUEST';
export const USER_PUT_RESPONSE = 'USER_PUT_RESPONSE';

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
export const USER_DELETE_RESPONSE = 'USER_DELETE_RESPONSE';

export const USER_FETCH_STATUS = 'USER_FETCH_STATUS';
/*
---------------------------------------
  ACTION CREATORS
---------------------------------------
*/

// -------------GET--------------------

export function userGetRequest() {
  return {
    type: USER_GET_REQUEST,
  };
}
export function userGetResponse(data) {
  return {
    type: USER_GET_RESPONSE,
    data,
  };
}
export function userFetchStatus(data) {
  return {
    type: USER_FETCH_STATUS,
    data,
  };
}
export function getUser(query, cb) {
  return dispatch => {
    dispatch(userGetRequest());
    dispatch(userFetchStatus({ status: true }));
    return fetch(`/main/profile?${query}`, { credentials: 'same-origin' })
      .then(response => {
        dispatch(userFetchStatus({ status: false }));
        return response.json();
      })
      .then(json => {
        if (cb) cb(json);
        dispatch(userGetResponse(json));
      });
  };
}

// -------------POST--------------------

export function userPostRequest() {
  return {
    type: USER_POST_REQUEST,
  };
}
export function userPostResponse(data) {
  return {
    type: USER_POST_RESPONSE,
    data,
  };
}
export function postUser(data, cb) {
  return dispatch => {
    dispatch(userPostRequest());
    return fetch('/main/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      if (cb) cb(json);
      dispatch(userPostResponse(json));
    });
  };
}

// -------------PUT--------------------

export function userPutRequest() {
  return {
    type: USER_PUT_REQUEST,
  };
}
export function userPutResponse(data) {
  return {
    type: USER_PUT_RESPONSE,
    data,
  };
}
export function putUser(data, cb) {
  return dispatch => {
    dispatch(userPutRequest());
    return fetch('/main/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      if (cb) cb(json);
      dispatch(userPutResponse(json));
    });
  };
}

// -------------DELETE--------------------

export function userDeleteRequest() {
  return {
    type: USER_DELETE_REQUEST,
  };
}
export function userDeleteResponse(data) {
  return {
    type: USER_DELETE_RESPONSE,
    data,
  };
}
export function deleteUser(data, cb) {
  return dispatch => {
    dispatch(userDeleteRequest());
    return fetch('/main/profile', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      if (cb) cb(data);
      dispatch(userDeleteResponse(json));
    });
  };
}
