import * as React from 'react'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

import { UserContext } from '../context/UserContext'

const Login = () => {
  const [error, setError] = useState('')
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const { authenticate } = useContext(UserContext)

  const onSubmit = async (data, event) => {
    try {
      const response = await authenticate(data)
      if (response.status === 200) {
        event.target.reset()
        history.push('/log')
      }
    } catch (err) {
      setError('Invalid credentials')
      console.error(err)
    }
  }

  return (
    <Container fluid style={{ textAlign: 'center' }}>
      <Row className='justify-content-md-center'>
        <Col sm={10} md={8} lg={6}>
          <br />
          <br />
          <h1>Login</h1>
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
            <Button type='submit'>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
