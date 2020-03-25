import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

interface ITodoWithUserName extends ITodo {
  userName: string | undefined
}

interface IProps {
  rows: Array<ITodoWithUserName> | undefined
}

const TasksTable: React.FC<IProps> = ({ rows }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { userID } = useParams()

  let userTodos = rows
  if (userID && rows) {
    userTodos = rows.filter(row => row.userId === +userID)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell align="right">Исполнитель задачи</TableCell>
            <TableCell align="right">Название задачи</TableCell>
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
                <TableCell align="right"><NavLink to={`/${row.userId}`}>{row.userName}</NavLink></TableCell>
                <TableCell align="right">
                  <TextField
                    onChange={(e) => {dispatch(setTodoTitle(row.id, e.target.value))}}
                    label="Standard"
                    value={row.title}/>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TasksTable
