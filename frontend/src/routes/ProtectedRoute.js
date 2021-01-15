import { Route, Redirect } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              // eslint-disable-next-line react/prop-types
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      }}
    />
  )
}
