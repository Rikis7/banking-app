import React, { useState } from 'react';
import { createAccount } from './api';

function CreateAccountForm({ setAccounts }) {
  const [accountHolder, setAccountHolder] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await createAccount(accountHolder, balance);
      setAccounts(prev => [...prev, data]);
      setAccountHolder('');
      setBalance('');
    } catch {
      alert('Failed to create account');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Account Holder" value={accountHolder} onChange={e => setAccountHolder(e.target.value)} />
      <input placeholder="Initial Balance" value={balance} onChange={e => setBalance(e.target.value)} />
      <button type="submit">Create Account</button>
    </form>
  );
}

export default CreateAccountForm;