// Libraries
import * as React from 'react'
import { useState, useMemo, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Log from './pages/Log'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Demo from './pages/Demo'

// Components
import AppNav from './components/common/AppNav'

// Routes
import { ProtectedRoute } from './routes/ProtectedRoute'
import { GuestRoute } from './routes/GuestRoute'

// Context
import { UserContext } from './context/UserContext'

// Cookies
import { getUserCookie, setUserCookie, removeUserCookie } from './utils/auth-cookies'

// API
import { login } from './utils/api'

function App () {
  const [user, setUser] = useState(null)

  const authenticate = async (user) => {
    const response = await login(user)
    if (response.status === 200) {
      const userToSave = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        token: response.data.token
      }
      setUser(userToSave)
      setUserCookie(userToSave)
    }

    return response
  }

  const logout = () => {
    setUser(null)
    removeUserCookie()
  }

  const userProvider = useMemo(() => ({ user, setUser, authenticate, logout }), [user, setUser])

  useEffect(() => {
    if (!user) {
      const userCookie = getUserCookie()
      if (userCookie) {
        setUser(userCookie)
      }
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={userProvider}>
        <Router>
          <AppNav />
          <Switch>
            <Route
              exact path='/'
              component={Home}
            />
            <ProtectedRoute
              exact
              path='/log'
              user={user}
              component={Log}
            />
            <GuestRoute
              exact
              path='/login'
              user={user}
              component={Login}
            />
            <GuestRoute
              exact
              path='/register'
              user={user}
              component={Register}
            />
            <GuestRoute
              exact
              path='/demo'
              user={user}
              component={Demo}
            />
            <Route
              path='*'
              component={NotFound}
            />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
