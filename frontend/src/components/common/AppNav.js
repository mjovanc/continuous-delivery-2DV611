import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'

const MainNavbar = () => {
  const { user, logout } = useContext(UserContext)
  const history = useHistory()

  const handleLogout = () => {
    history.push('/')
    logout()
  }

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand as={Link} to='/'>Logger</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            {user ? <Nav.Link as={Link} to='/log'>Log</Nav.Link> : null}
            {!user ? <Nav.Link as={Link} to='/register'>Register</Nav.Link> : null}
            {!user ? <Nav.Link as={Link} to='/login'>Login</Nav.Link> : null}
            {user ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link> : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default MainNavbar
