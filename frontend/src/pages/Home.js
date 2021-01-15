import * as React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Home = () => {
  return (
    <Container style={{ textAlign: 'center' }}>
      <br />
      <br />
      <h1>Home</h1>
      <br />
      <br />
      <Row className='justify-content-md-center'>
        <Col sm={6}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          turpis magna, malesuada at velit sit amet, porttitor molestie ipsum.
          Aenean hendrerit in diam vel venenatis. Nunc cursus malesuada diam, ac
          feugiat diam malesuada eget. Vestibulum velit turpis, dapibus id
          suscipit eget, ornare sit amet nisi.
        </Col>
      </Row>
    </Container>
  )
}

export default Home
