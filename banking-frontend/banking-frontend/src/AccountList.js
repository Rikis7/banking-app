import React from 'react';

function AccountList({ accounts }) {
  return (
    <div>
      <h2>Bank Accounts</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            {account.accountHolder} - Balance: ${account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountList;
