import * as React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Demo = () => {
  return (
      <Container style={{ textAlign: 'center' }}>
      <br />
      <br />
      <Row className='justify-content-md-center'>
        <Col sm={6}>
          <h2>Image:</h2>
          <h3>{process.env.REACT_APP_IMAGE}</h3>
        </Col>
      </Row>
     </Container>
  )
}

export default Demo
