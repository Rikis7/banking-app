const BASE_URL = process.env.REACT_APP_API_URL;

export async function createAccount(accountHolder, balance) {
  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accountHolder, balance: Number(balance) })
  });
  return await response.json();
}

export async function getAccounts() {
  const response = await fetch(`${BASE_URL}/accounts`);
  return await response.json();
}

export async function deposit(id, amount) {
  const response = await fetch(`${BASE_URL}/deposit/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ balance: amount })
  });
  return await response.json();
}

export async function withdraw(id, amount) {
  const response = await fetch(`${BASE_URL}/withdraw/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ balance: amount })
  });
  return await response.json();
}

export async function transfer(fromId, toId, amount) {
  const response = await fetch(`${BASE_URL}/transfer?fromId=${fromId}&toId=${toId}&amount=${amount}`, {
    method: 'POST'
  });
  return await response.text();
}

export async function getTransactions(accountId) {
  const response = await fetch(`${BASE_URL}/account/${accountId}/transactions`);
  return await response.json();
}