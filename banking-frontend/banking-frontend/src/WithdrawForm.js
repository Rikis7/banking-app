import React, { useState } from 'react';
import { withdraw } from './api';

function WithdrawForm() {
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    try {
      await withdraw(id, amount);
      alert('Withdraw successful');
    } catch {
      alert('Failed to withdraw');
    }
  };

  return (
    <div>
      <input placeholder="Account ID" value={id} onChange={e => setId(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}

export default WithdrawForm;