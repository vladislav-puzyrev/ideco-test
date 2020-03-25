import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { RootReducerType } from './store'
import { ITodo, IUser } from '../types/types'

/* Action types */
const SET_TODOS = 'ideco-test/tasks/SET_TODOS'
const SET_USERS = 'ideco-test/tasks/SET_USERS'
const DELETE_TODO = 'ideco-test/tasks/DELETE_TODO'
const TOGGLE_TODO_COMPLETED = 'ideco-test/tasks/TOGGLE_TODO_COMPLETED'
const SET_TODO_TITLE = 'ideco-test/tasks/SET_TODO_TITLE'
const ADD_TODO = 'ideco-test/tasks/ADD_TODO'

const initialState = {
  todos: undefined as Array<ITodo> | undefined,
  users: undefined as Array<IUser> | undefined,
}

type InitialStateType = typeof initialState

type ActionTypes =
  setTodosType |
  setUsersType |
  deleteTodoType |
  toggleTodoCompletedType |
  setTodoTitleType |
  addTodoType

function tasksReducer (state = initialState, action: ActionTypes): InitialStateType {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos
      }

    case SET_USERS:
      return {
        ...state,
        users: action.users
      }

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos?.filter(todo => todo.id !== action.id)
      }

    case TOGGLE_TODO_COMPLETED:
      return {
        ...state,
        todos: state.todos?.map(todo => ({
          ...todo,
          completed: todo.id === action.id ? !todo.completed : todo.completed
        }))
      }

    case SET_TODO_TITLE:
      return {
        ...state,
        todos: state.todos?.map(todo => ({
          ...todo,
          title: todo.id === action.id ? action.value : todo.title
        }))
      }

    case ADD_TODO:
      return {
        ...state,
        todos: [
          // @ts-ignore
          ...state.todos,
          {
            userId: action.userId,
            id: state.todos?.length ? state.todos.length + 1 : 0,
            title: action.title,
            completed: false,
          }
        ]
      }

    default:
      return state
  }
}

/* Action creators */
type setTodosType = { type: typeof SET_TODOS, todos: Array<ITodo> }
export const setTodos = (todos: Array<ITodo>): setTodosType => ({
  type: SET_TODOS,
  todos,
})

type setUsersType = { type: typeof SET_USERS, users: Array<IUser> }
export const setUsers = (users: Array<IUser>): setUsersType => ({
  type: SET_USERS,
  users,
})

type deleteTodoType = { type: typeof DELETE_TODO, id: number }
export const deleteTodo = (id: number): deleteTodoType => ({
  type: DELETE_TODO,
  id,
})

type toggleTodoCompletedType = { type: typeof TOGGLE_TODO_COMPLETED, id: number }
export const toggleTodoCompleted = (id: number): toggleTodoCompletedType => ({
  type: TOGGLE_TODO_COMPLETED,
  id,
})

type setTodoTitleType = { type: typeof SET_TODO_TITLE, id: number, value: string }
export const setTodoTitle = (id: number, value: string): setTodoTitleType => ({
  type: SET_TODO_TITLE,
  id,
  value
})

type addTodoType = { type: typeof ADD_TODO, title: string, userId: number | undefined }
export const addTodo = (title: string, userId: number | undefined): addTodoType => ({
  type: ADD_TODO,
  title,
  userId
})

/* Thunk creators */
type ThunkType = ThunkAction<Promise<void>, RootReducerType, unknown, ActionTypes>

export const getTodos = (): ThunkType => {
  return async (dispatch) => {
    const res = await axios.get('http://jsonplaceholder.typicode.com/todos')
    const todos = res.data
    dispatch(setTodos(todos))
  }
}

export const getUsers = (): ThunkType => {
  return async (dispatch) => {
    const res = await axios.get('http://jsonplaceholder.typicode.com/users')
    const users = res.data
    dispatch(setUsers(users))
  }
}

export default tasksReducer
