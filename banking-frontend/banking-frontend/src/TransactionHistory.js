import React, { useState, useEffect } from 'react';

function TransactionHistory({ accountId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (accountId) {
      fetch(`http://localhost:8080/api/banking/account/${accountId}/transactions`)
        .then((res) => res.json())
        .then(setTransactions)
        .catch(() => alert('Failed to fetch transactions'));
    }
  }, [accountId]);

  return (
    <div>
      <h3>Transaction History for Account {accountId}</h3>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.type} of ${transaction.amount} on {transaction.dateTime}
            </li>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>
    </div>
  );
}

export default TransactionHistory;
