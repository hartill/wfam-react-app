import { render, screen } from '@testing-library/react'
import App from './App'

test('Renders correctly', () => {
  render(<App />)
  const titleElement = screen.getByText(/Turbine A/i)
  expect(titleElement).toBeInTheDocument()
})
