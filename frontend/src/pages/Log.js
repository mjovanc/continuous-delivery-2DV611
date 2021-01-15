import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { UserContext } from '../context/UserContext'
import CreateForm from '../components/log/CreateForm'
import LogItem from '../components/log/LogItem'
import { getLogs, deleteLog } from '../utils/api'

const Log = () => {
  const [logs, setLogs] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getLogs(user.id)
      logs.sort((a, b) => new Date(b.created) - new Date(a.created)) // Could be sorted in queries...
      setLogs(logs)
    }
    fetchLogs()
  }, [showCreateForm]) // Fetch new logs when showCreateForm is changed (could be optimized...)

  const handleDelete = async (logId) => {
    try {
      await deleteLog(logId)
      setLogs(logs.filter((log) => log.id !== logId))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container style={{ textAlign: 'center', maxWidth: '1200px' }}>
      <br />
      <br />
      <h1>Log</h1>
      <br />
      <br />
      <Row className='justify-content-md-center'>
        <Col>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            Create log
          </Button>
        </Col>
      </Row>
      <br />
      <Row className='justify-content-md-center'>
        <Col>
          {showCreateForm ? (
            <CreateForm setShowCreateForm={setShowCreateForm}></CreateForm>
          ) : null}
        </Col>
      </Row>
      <br />
      <h3>Latest logs</h3>
      <br />
      <Row className='justify-content-md-center'>
        {logs.map((log) => {
          return (
            <Col key={log.id} sm={12} md={6} style={{ marginTop: '1em' }}>
              <LogItem
                id={log.id}
                name={log.name}
                description={log.description}
                created={new Date(log.created)}
                handleDelete={handleDelete}
              ></LogItem>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Log
