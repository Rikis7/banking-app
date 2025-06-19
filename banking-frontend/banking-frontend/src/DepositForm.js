import React, { useState } from 'react';
import { deposit } from './api';

function DepositForm() {
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    try {
      await deposit(id, amount);
      alert('Deposit successful');
    } catch {
      alert('Failed to deposit');
    }
  };

  return (
    <div>
      <input placeholder="Account ID" value={id} onChange={e => setId(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}

export default DepositForm;