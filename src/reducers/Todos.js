import {
  GET_TODOS,
  MARK_COMPLETE,
  DEL_TODO,
  ADD_TODO,
  EDIT_TODO,
  Del_All_COMPLETED,
} from "../actions/types.js";

const initialState = {
  todos: [],
  showCompletedTodos: false,
  isAdd: false,
  isEdit: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case MARK_COMPLETE:
      const updatedTodo = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === updatedTodo.id) {
            todo = updatedTodo;
          }
          return todo;
        }),
      };
    case DEL_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...action.payload }
            : { ...todo, ...Date }
        ),
      };
    case Del_All_COMPLETED:
      return {
        ...state,
        todos: [...state.todos.filter((todo) => !todo.completed)],
      };
    default:
      return state;
  }
}
