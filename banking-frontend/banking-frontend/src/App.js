import React, { useEffect, useState } from 'react';
import CreateAccountForm from './CreateAccountForm';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';
import TransferForm from './TransferForm';
import TransactionHistory from './TransactionHistory';
import { getAccounts } from './api';

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch {
        alert('Failed to load accounts');
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Banking App</h1>
      <h2>Create New Account</h2>
      <CreateAccountForm setAccounts={setAccounts} />
      <h2>Bank Accounts</h2>
      <ul>
        {accounts.map(acc => (
          <li key={acc.id}>
            {acc.accountHolder} - Balance: ${acc.balance}
          </li>
        ))}
      </ul>
      <TransactionHistory accountId={1} />
      <h2>Deposit Money</h2>
      <DepositForm />
      <h2>Withdraw Money</h2>
      <WithdrawForm />
      <h2>Transfer Money</h2>
      <TransferForm />
    </div>
  );
}

export default App;