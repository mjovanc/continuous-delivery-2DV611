import { Container, Row, Col } from 'react-bootstrap'

const NotFound = () => {
  return (
    <Container fluid style={{ textAlign: 'center' }}>
      <Row className='justify-content-md-center'>
        <Col>
          <br />
          <br />
          <h1>404: Not Found</h1>
          <br />
          <br />
        </Col>
      </Row>
    </Container>
  )
}
export default NotFound
