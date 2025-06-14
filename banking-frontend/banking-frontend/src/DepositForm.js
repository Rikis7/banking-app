import React, { useState } from 'react';

function DepositForm({ setAccounts }) {
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');

  const depositMoney = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/banking/deposit/${id}?amount=${amount}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        setAccounts((prev) =>
          prev.map((account) =>
            account.id === id ? { ...account, balance: data.balance } : account
          )
        );
        setId('');
        setAmount('');
      })
      .catch(() => alert('Failed to deposit money'));
  };

  return (
    <form onSubmit={depositMoney}>
      <h3>Deposit Money</h3>
      <input
        type="number"
        placeholder="Account ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
