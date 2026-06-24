import { render, screen } from '@testing-library/react'
import { LoadingBar } from './LoadingBar'
import { LoadingContext } from '@/context/LoadingContext'

function renderWithContext(isLoading: boolean) {
  return render(
    <LoadingContext.Provider value={{ isLoading, setIsLoading: jest.fn() }}>
      <LoadingBar />
    </LoadingContext.Provider>
  )
}

describe('LoadingBar', () => {
  it('renders the status bar when loading', () => {
    renderWithContext(true)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('does not render when not loading', () => {
    renderWithContext(false)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('has accessible label', () => {
    renderWithContext(true)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading content')
  })
})
