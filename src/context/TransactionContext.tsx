import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  type?: 'income' | 'outcome'
  price: number
  category: string
  createdAt?: string
}
interface TransactionContextType {
  transactions: Transaction[]
  fetchTransaction: (querry?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction[]>([])

  const fetchTransaction = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransaction(response.data)
  }, [])

  const createTransaction = useCallback(
    async (inputs: CreateTransactionInput) => {
      const { description, category, price, type } = inputs

      const response = await api.post('transactions', {
        description,
        type,
        category,
        price,
        createdAt: new Date(),
      })

      setTransaction((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransaction()
  }, [fetchTransaction])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransaction,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
