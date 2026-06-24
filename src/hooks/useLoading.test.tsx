import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { useLoading } from './useLoading'
import { LoadingProvider } from '@/providers/LoadingProvider'

describe('useLoading', () => {
  it('returns isLoading and setIsLoading when inside LoadingProvider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <LoadingProvider>{children}</LoadingProvider>
    )
    const { result } = renderHook(() => useLoading(), { wrapper })

    expect(result.current.isLoading).toBe(false)
    expect(typeof result.current.setIsLoading).toBe('function')
  })

  it('throws when used outside LoadingProvider', () => {
    // Suppress React error boundary output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useLoading())).toThrow(
      'useLoading must be used within LoadingProvider'
    )

    consoleSpy.mockRestore()
  })
})
