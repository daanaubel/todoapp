import axios from "axios";
import {
  GET_TODOS,
  MARK_COMPLETE,
  DEL_TODO,
  ADD_TODO,
  EDIT_TODO,
  Del_All_COMPLETED,
} from "./types";

const tokenConfig = (token) => {
  return {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
};

export const getTodos = () => (dispatch, getState) => {
  const token = getState().auth.token;
  axios.get(`todos/`, tokenConfig(token)).then((res) => {
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  });
};

export const markComplete = (todo) => (dispatch, getState) => {
  const token = getState().auth.token;
  axios
    .patch(
      `todos/${todo.id}/`,
      {
        completed: !todo.completed,
      },
      tokenConfig(token)
    )
    .then((res) => {
      dispatch({
        type: MARK_COMPLETE,
        payload: res.data,
      });
    });
};

export const delTodo = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  axios.delete(`todos/${id}/`, tokenConfig(token)).then((res) => {
    dispatch({
      type: DEL_TODO,
      payload: id,
    });
  });
};
export const addTodo = (newTodo) => (dispatch, getState) => {
  const token = getState().auth.token;
  axios.post(`todos/`, newTodo, tokenConfig(token)).then((res) => {
    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
  });
};
export const editTodo = (newTodo) => (dispatch, getState) => {
  const token = getState().auth.token;
  axios.put(`todos/${newTodo.id}/`, newTodo, tokenConfig(token)).then((res) => {
    dispatch({
      type: EDIT_TODO,
      payload: res.data,
    });
  });
};
export const delAllCompletedTodos = () => (dispatch, getState) => {
  console.log("del");
  const token = getState().auth.token;
  axios.delete(`todos/completed/`, tokenConfig(token)).then((res) => {
    dispatch({
      type: Del_All_COMPLETED,
    });
  });
};
