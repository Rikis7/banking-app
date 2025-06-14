import React, { useState, useEffect } from 'react';
import CreateAccountForm from './CreateAccountForm';
import AccountList from './AccountList';
import TransactionHistory from './TransactionHistory';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';
import TransferForm from './TransferForm';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch accounts from backend API
  useEffect(() => {
    fetch('http://localhost:8080/api/banking/accounts')
      .then((res) => res.json())
      .then(setAccounts)
      .catch(() => setMessage('Failed to fetch accounts.'));
  }, []);

  return (
    <div className="container">
      <header>Banking App</header>
      <CreateAccountForm setAccounts={setAccounts} />
      <AccountList accounts={accounts} />
      <TransactionHistory accountId={1} />
      <DepositForm setAccounts={setAccounts} />
      <WithdrawForm setAccounts={setAccounts} />
      <TransferForm setAccounts={setAccounts} />
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
