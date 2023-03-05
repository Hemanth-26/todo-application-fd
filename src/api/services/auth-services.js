import httpClient from "../http-client";
import {
  GET_TODO_LIST,
  ADD_TODO_LIST,
  DELETE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  GET_IP_ADDRESS,
} from "../config";

const AuthServices = {
  getTodoList: () =>
    httpClient.get(GET_TODO_LIST).then((response) => response.data),
  addTodoList: (data) =>
    httpClient.post(ADD_TODO_LIST, data).then((response) => response.data),
  deleteTodoItem: (id) =>
    httpClient
      .post(`${DELETE_TODO_ITEM}/${id}`)
      .then((response) => response.data),
  updateTodoItem: (id, data) =>
    httpClient
      .post(`${UPDATE_TODO_ITEM}/${id}`, data)
      .then((response) => response.data),
  getIP: () =>
    httpClient.get(GET_IP_ADDRESS).then((response) => response.data),
};

export default AuthServices;
