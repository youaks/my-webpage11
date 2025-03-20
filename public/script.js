async function login() {
  const email = document.getElementById('loginEmail').value;
  const phone = document.getElementById('loginPhone').value;
  const password = document.getElementById('loginPassword').value;

  // Validate inputs
  if (!email || !phone || !password) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    alert(result.message);

    if (result.users) {
      // Display user details in a table
      displayUsers(result.users);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
}

function displayUsers(users) {
  const userTable = `
    <h2>Admin Dashboard</h2>
    <table border="1">
      <tr>
        <th>Email</th>
        <th>Phone</th>
        <th>Password</th>
      </tr>
      ${users.map(user => `
        <tr>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.password}</td>
        </tr>
      `).join('')}
    </table>
  `;

  // Add the table to the page
  document.body.innerHTML += userTable;
}
