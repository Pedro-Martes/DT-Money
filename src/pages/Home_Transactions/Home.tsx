import { Header } from '../../components/Header/Index'
import { Summary } from '../../components/Summary/Index'
import { Search } from './components/Search'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionTable,
  TrashIncon,
} from './style'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../../context/TransactionContext'
import { dateFormat, priceFormatter } from '../../utils/formater'
import { Trash } from 'phosphor-react'

export function HomeTrasaction() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <Search />
        <TransactionTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    {' '}
                    <PriceHighLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormat.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  )
}
