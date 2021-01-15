import PropTypes from 'prop-types'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const LogItem = ({ id, name, description, created, handleDelete }) => {
  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup>
        <ListGroupItem>Created at: {created.toLocaleString()}</ListGroupItem>
      </ListGroup>
      <Button
        variant='danger'
        style={{ margin: '0.1em' }}
        onClick={() => handleDelete(id)}
      >
        Delete
      </Button>
    </Card>
  )
}

LogItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.instanceOf(Date),
  handleDelete: PropTypes.func
}

export default LogItem
