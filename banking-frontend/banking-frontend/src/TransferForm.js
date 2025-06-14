import React, { useState } from 'react';

function TransferForm({ setAccounts }) {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const transferMoney = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    fetch(`http://localhost:8080/api/banking/transfer?fromId=${fromId}&toId=${toId}&amount=${amount}`, {
      method: 'PUT',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Transfer failed');
        }
        return res.text(); // Get plain text response
      })
      .then((text) => {
        // Check if we received success message
        if (text.includes('Transfer successful')) {
          // After successful transfer, fetch updated accounts
          fetch('http://localhost:8080/api/banking/accounts')
            .then((res) => res.json())
            .then((data) => {
              setAccounts(data); // Update accounts
              setMessage('Transfer successful!');
              setFromId('');
              setToId('');
              setAmount('');
            })
            .catch(() => setMessage('Failed to fetch updated accounts.'));
        } else {
          setMessage(text); // Show any error messages returned
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to transfer money. Please check account details and balance.');
      })
      .finally(() => setLoading(false)); // Stop loading
  };

  return (
    <form onSubmit={transferMoney}>
      <h3>Transfer Money</h3>
      <input
        type="number"
        placeholder="From Account ID"
        value={fromId}
        onChange={(e) => setFromId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="To Account ID"
        value={toId}
        onChange={(e) => setToId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Transfer'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default TransferForm;
