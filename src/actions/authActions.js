import axios from "axios";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(res => {
      history.push('/login');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      axios.defaults.headers.common["Authorization"] = token;
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(setCurrentUser({}));
};