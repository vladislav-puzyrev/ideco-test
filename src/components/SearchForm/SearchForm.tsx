import React from 'react'
import { IUser } from '../../types/types'
import { Formik, Form, useField } from 'formik'
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import s from './SearchForm.module.css'
import * as Yup from 'yup'

const MyTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)

  return (
    <div className={s.wrapper}>
      <TextField fullWidth label="Название задачи" {...field} {...props}/>
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </div>
  )
}

const MyRadioButton = ({ label, ...props }: any) => {
  const [field, meta] = useField(props)

  return (
    <div className={s.wrapper}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Прогресс задачи</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" onChange={() => {}}>
          <FormControlLabel {...field} {...props} value="Выполненная" control={<Radio/>} label="Выполненная"/>
          <FormControlLabel {...field} {...props} value="Не выполненная" control={<Radio/>} label="Не выплненная"/>
          <FormControlLabel {...field} {...props} value="Любая" control={<Radio/>} label="Любая"/>
        </RadioGroup>
      </FormControl>
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </div>
  )
}

interface IProps {
  users: Array<IUser> | undefined
  setSearchString: (string: string | null) => void
  setCompletedMode: (string: 'Выполненная' | 'Не выполненная' | 'Любая') => void
}

const SearchForm: React.FC<IProps> = ({ users, setSearchString, setCompletedMode }) => {
  return (
    <Formik
      initialValues={{
        searchString: '',
        completedFind: '',
      }}
      validationSchema={Yup.object({
        searchString: Yup.string()
          .max(15, 'Максимум 15 символов')
          .required('Название обязательно'),
        completedFind: Yup.string().required('Выбор обязателен'),
      })}
      onSubmit={(values) => {
        setSearchString(values.searchString)
        // @ts-ignore
        setCompletedMode(values.completedFind)
      }}
    >
      <Form>
        <div className={s.form}>
          <MyRadioButton
            name="completedFind"
            users={users}
          />
          <div className={s.search}>
            <MyTextInput
              name="searchString"
            />
            <Button variant="contained" color="primary" type="submit">Найти</Button>
            <Button style={{marginLeft: '20px'}} onClick={() => {
              setSearchString(null)
              setCompletedMode('Любая')
            }} variant="contained" color="primary" type="button">Сброс</Button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default SearchForm
