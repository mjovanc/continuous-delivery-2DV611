import * as React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { signup } from '../utils/api'

const Register = () => {
  const [error, setError] = useState('')
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data, event) => {
    try {
      const response = await signup(data)
      if (response.status === 200) {
        event.target.reset()
        history.push('/login')
      }
    } catch (err) {
      setError('Error: Account not created')
      console.error(err)
    }
  }

  return (
    <Container fluid style={{ textAlign: 'center' }}>
      <Row className='justify-content-md-center'>
        <Col sm={10} md={8} lg={6}>
          <br />
          <br />
          <h1>Register</h1>
          <br />
          <br />
          {error
            ? (
              <Alert variant='danger' style={{ margin: '10px' }}>
                {error}
              </Alert>
              )
            : null}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                type='email'
                ref={register({ required: true, minLength: 1, maxLength: 50 })}
              />
              {errors.email
                ? (
                  <Alert variant='danger' style={{ margin: '10px' }}>
                    Invalid email
                  </Alert>
                  )
                : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='password'
                type='password'
                ref={register({ required: true, minLength: 8, maxLength: 500 })}
              />
              {errors.password
                ? (
                  <Alert variant='danger' style={{ margin: '10px' }}>
                    Invalid password
                  </Alert>
                  )
                : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                type='text'
                ref={register({ required: true, minLength: 1, maxLength: 50 })}
              />
              {errors.name
                ? (
                  <Alert variant='danger' style={{ margin: '10px' }}>
                    Invalid name
                  </Alert>
                  )
                : null}
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
