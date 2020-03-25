import React, { useEffect, useState } from 'react'
import s from './App.module.css'
import TasksTable from './Table/TasksTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { getUsers, getTodos } from '../redux/tasks-reducer'
import { NavLink, Route } from 'react-router-dom'
import AddTaskForm from './AddTaskForm/AddTaskForm'
import SearchForm from './SearchForm/SearchForm'

function App () {
  const dispatch = useDispatch()

  const users = useSelector((state: RootReducerType) => state.tasks.users)
  const todos = useSelector((state: RootReducerType) => {
    return state.tasks.todos?.map(todo => {
      return {
        ...todo,
        userName: state.tasks.users?.find(user => user.id === todo.userId)?.username
      }
    })
  })?.reverse()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTodos())
  }, [dispatch])

  const [searchString, setSearchString] = useState<string | null>(null)
  const [completedMode, setCompletedMode] = useState<'Выполненная' | 'Не выполненная' | 'Любая'>('Любая')

  return (
    <div className={s.page}>
      <header className={s.header}>
        <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Ideco - Список дел <span role="img" aria-label="Смайлик улыбки">🙂</span>
        </NavLink>
      </header>

      <main className={s.main}>
        <SearchForm users={users} setSearchString={setSearchString} setCompletedMode={setCompletedMode}/>
        <AddTaskForm users={users}/>
        <Route exact path='/:userID?' render={
          () => <TasksTable rows={todos} searchString={searchString} completedMode={completedMode}/>
        }/>
      </main>
    </div>
  )
}

export default App
