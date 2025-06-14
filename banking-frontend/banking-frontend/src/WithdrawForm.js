import React, { useState } from 'react';

function WithdrawForm({ setAccounts }) {
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');

  const withdrawMoney = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/banking/withdraw/${id}?amount=${amount}`, {
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
      .catch(() => alert('Failed to withdraw money'));
  };

  return (
    <form onSubmit={withdrawMoney}>
      <h3>Withdraw Money</h3>
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
      <button type="submit">Withdraw</button>
    </form>
  );
}

export default WithdrawForm;
