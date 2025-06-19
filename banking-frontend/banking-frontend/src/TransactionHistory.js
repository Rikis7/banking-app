import React, { useEffect, useState } from 'react';
import { getTransactions } from './api';

function TransactionHistory({ accountId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTx() {
      try {
        const data = await getTransactions(accountId);
        setTransactions(data);
      } catch {
        alert('Failed to fetch transactions');
      }
    }
    fetchTx();
  }, [accountId]);

  return (
    <div>
      <h3>Transaction History for Account {accountId}</h3>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>{t.type} of ${t.amount} on {t.timestamp}</li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;