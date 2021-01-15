import * as React from 'react'
import { render } from '@testing-library/react'
import Home from '../Home'

describe('Home', () => {
  test('renders Home component', () => {
    render(<Home />)
  })
})
