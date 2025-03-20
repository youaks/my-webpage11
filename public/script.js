async function login() {
  const email = document.getElementById('loginEmail').value;
  const phone = document.getElementById('loginPhone').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, phone, password }),
  });

  const result = await response.json();
  alert(result.message);
  if (result.users) {
    console.log('Admin Dashboard:', result.users);
  }
}

async function signup() {
  const email = document.getElementById('signupEmail').value;
  const phone = document.getElementById('signupPhone').value;
  const password = document.getElementById('signupPassword').value;

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, phone, password }),
  });

  const result = await response.json();
  alert(result.message);
}