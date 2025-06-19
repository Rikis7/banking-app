import React, { useState } from 'react';
import { transfer } from './api';

function TransferForm() {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    try {
      await transfer(fromId, toId, amount);
      alert('Transfer successful');
    } catch {
      alert('Failed to transfer money');
    }
  };

  return (
    <div>
      <input placeholder="From Account ID" value={fromId} onChange={e => setFromId(e.target.value)} />
      <input placeholder="To Account ID" value={toId} onChange={e => setToId(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}

export default TransferForm;