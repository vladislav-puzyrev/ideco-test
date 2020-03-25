import React, { useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { ITodo } from '../../types/types'
import { useParams } from 'react-router-dom'
import { Tooltip, IconButton, Button, TextField } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { deleteTodo, toggleTodoCompleted, setTodoTitle } from '../../redux/tasks-reducer'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import useSetTitle from '../../hooks/useSetTitle'

interface ITodoWithUserName extends ITodo {
  userName: string | undefined
}

interface IProps {
  rows: Array<ITodoWithUserName> | undefined
  completedMode: 'Выполненная' | 'Не выполненная' | 'Любая'
  searchString: string | null
}

const TasksTable: React.FC<IProps> = ({ rows, searchString, completedMode }) => {
  const dispatch = useDispatch()
  const { userID } = useParams()
  let userTodos = rows

  if (userID && rows) {
    userTodos = rows.filter(row => row.userId === +userID)
  }

  if (searchString) {
    userTodos = userTodos?.filter(row => row.title.includes(searchString))
  }

  if (completedMode === 'Выполненная') {
    userTodos = userTodos?.filter(row => row.completed)
  }

  if (completedMode === 'Не выполненная') {
    userTodos = userTodos?.filter(row => !row.completed)
  }

  useSetTitle(userTodos ? `Всего задач - ${userTodos.length}` : null)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell align="left">Исполнитель задачи</TableCell>
            <TableCell align="left">Название задачи</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            userTodos?.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Tooltip title="Delete">
                    <IconButton onClick={() => {dispatch(deleteTodo(row.id))}} aria-label="delete">
                      <DeleteIcon/>
                    </IconButton>
                  </Tooltip>
                  <Button onClick={() => {dispatch(toggleTodoCompleted(row.id))}}>
                    {row.completed ? 'выполнено' : 'не выполнено'}
                  </Button>
                </TableCell>
                <TableCell align="left"><NavLink to={`/${row.userId}`}>{row.userName}</NavLink></TableCell>
                <TableCell align="left">
                  <TextField
                    onChange={(e) => {dispatch(setTodoTitle(row.id, e.target.value))}}
                    value={row.title}
                    fullWidth/>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default React.memo(TasksTable)
