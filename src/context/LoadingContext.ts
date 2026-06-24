import { createContext } from 'react'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export const LoadingContext = createContext<LoadingContextType | null>(null)
