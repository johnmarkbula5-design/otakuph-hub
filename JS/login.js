/* ============================================================
   OTAKUPH — login.js
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) { window.location.href = 'index.html'; return; }

  const btn = document.getElementById('loginBtn');
  const alertBox = document.getElementById('loginAlert');

  function showAlert(msg, success = false) {
    alertBox.textContent = msg;
    alertBox.className = 'alert' + (success ? ' alert-success' : '');
    alertBox.style.display = 'block';
  }

  btn.addEventListener('click', () => {
    const identifier = document.getElementById('loginIdentifier').value.trim();
    const password   = document.getElementById('loginPassword').value;
    const remember   = document.getElementById('rememberMe').checked;

    if (!identifier || !password) {
      return showAlert('Please enter your username/email and password.');
    }

    const users = getUsers();
    const user = users.find(u =>
      (u.username.toLowerCase() === identifier.toLowerCase() ||
       u.email.toLowerCase() === identifier.toLowerCase()) &&
      u.password === password
    );

    if (!user) {
      return showAlert('Incorrect username/email or password. Please try again.');
    }

    setCurrentUser(user, remember);
    showAlert('Welcome back, ' + user.username + '! Redirecting...', true);
    btn.disabled = true;
    setTimeout(() => window.location.href = 'index.html', 1000);
  });

  document.querySelectorAll('.form-input').forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
  });
});
