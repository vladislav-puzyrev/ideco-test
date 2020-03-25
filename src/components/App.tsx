import React, { useEffect } from 'react'
import s from './App.module.css'
import TasksTable from './Table/TasksTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { getUsers, getTodos } from '../redux/tasks-reducer'
import { NavLink, Route } from 'react-router-dom'
import AddTaskForm from './AddTaskForm/AddTaskForm'

function App () {
  const dispatch = useDispatch()

  const todos = useSelector((state: RootReducerType) => {
    return state.tasks.todos?.map(todo => {
      return {
        ...todo,
        userName: state.tasks.users?.find(user => user.id === todo.userId)?.username
      }
    })
  })?.reverse()

  const users = useSelector((state: RootReducerType) => state.tasks.users)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTodos())
  }, [dispatch])

  return (
    <div className={s.page}>
      <header className={s.header}>
        <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Ideco - Список дел <span role="img" aria-label="Смайлик улыбки">🙂</span>
        </NavLink>
      </header>
      <main className={s.main}>
        <AddTaskForm users={users}/>
        <Route exact path='/:userID?' render={() => <TasksTable rows={todos}/>}/>
      </main>
    </div>
  )
}

export default App
