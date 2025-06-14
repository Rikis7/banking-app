import React, { useState } from 'react';

function CreateAccountForm({ setAccounts }) {
  const [accountHolder, setAccountHolder] = useState('');
  const [balance, setBalance] = useState('');

  const createAccount = e => {
    e.preventDefault();
    fetch('http://localhost:8080/api/banking/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountHolder, balance: Number(balance) })
    })
      .then(res => res.json())
      .then(data => {
        setAccounts(prev => [...prev, data]);
        setAccountHolder('');
        setBalance('');
      })
      .catch(() => alert('Failed to create account'));
  };

  return (
    <form onSubmit={createAccount}>
      <h3>Create New Account</h3>
      <input
        type="text"
        placeholder="Account Holder"
        value={accountHolder}
        onChange={e => setAccountHolder(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Initial Balance"
        value={balance}
        onChange={e => setBalance(e.target.value)}
        required
      />
      <button type="submit">Create Account</button>
    </form>
  );
}

export default CreateAccountForm;
