import React from 'react'
import { IUser } from '../../types/types'
import { Formik, Form, useField } from 'formik'
import { Button, TextField, Select, MenuItem } from '@material-ui/core'
import s from './AddTaskForm.module.css'
import * as Yup from 'yup'
import { addTodo } from '../../redux/tasks-reducer'
import { useDispatch } from 'react-redux'

const MyTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)
  return (
    <div className={s.wrapper}>
      <TextField label="Название задачи" {...field} {...props}/>
      {
        meta.touched && meta.error ? (
          <div className={s.error}>{meta.error}</div>
        ) : null
      }
    </div>
  )
}

const MySelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)
  const users = props.users
  return (
    <div className={s.wrapper}>
      <Select {...field} {...props}>
        {
          users?.map((user: any) => (
            <MenuItem key={user.id} value={user.username}>{user.username}</MenuItem>
          ))
        }
      </Select>
      {
        meta.touched && meta.error ? (
          <div className={s.error}>{meta.error}</div>
        ) : null
      }
    </div>
  )
}

interface IProps {
  users: Array<IUser> | undefined
}

const AddTaskForm: React.FC<IProps> = ({ users }) => {
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        title: '',
        user: '',
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(15, 'Максимум 15 символов')
          .required('Название обязательно'),
        user: Yup.string().required('Пользователь обязателен'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addTodo(
          values.title,
          users?.find(user => user.username === values.user)?.id
        ))
      }}
    >
      <Form>

        <div className={s.form}>
          <MyTextInput
            name="title"
          />
          <MySelect
            name="user"
            users={users}
          />
          <Button variant="contained" color="primary" type="submit">Создать задачу</Button>
        </div>

      </Form>
    </Formik>
  )
}

export default AddTaskForm
