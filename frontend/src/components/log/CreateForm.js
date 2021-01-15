// Context
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Form, Button, Alert } from 'react-bootstrap'
import { createLog } from '../../utils/api'
import { UserContext } from '../../context/UserContext'

const CreateForm = ({ setShowCreateForm }) => {
  const { register, handleSubmit, errors } = useForm()
  const { user } = useContext(UserContext)

  const onSubmit = async (data, event) => {
    try {
      // Setting owner of the log
      data.owner = user.id
      const response = await createLog(data)
      if (response.status === 200) {
        event.target.reset()
        setShowCreateForm(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
            type='name'
            ref={register({ required: true, minLength: 1, maxLength: 50 })}
          />
          {errors.name
            ? (
              <Alert variant='danger' style={{ margin: '10px' }}>
                Invalid name
              </Alert>)
            : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='description'
            as='textarea'
            ref={register({ maxLength: 200 })}
          />
          {errors.description && errors.description.type === 'maxLength' && (
            <Alert variant='danger' style={{ margin: '10px' }}>
              Description cannot contain more than 200 characters
            </Alert>
          )}
        </Form.Group>
        <Button type='submit'>Submit</Button>
      </Form>
    </>
  )
}

CreateForm.propTypes = {
  setShowCreateForm: PropTypes.func
}

export default CreateForm
