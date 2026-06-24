import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'

describe('Header', () => {
  it('renders the Podcaster logo link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: /podcaster/i })
    expect(link).toBeInTheDocument()
  })

  it('logo link points to home', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /podcaster/i })).toHaveAttribute('href', '/')
  })
})
