/* ============================================================
   OTAKUPH — register.js
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) { window.location.href = 'index.html'; return; }

  const btn = document.getElementById('registerBtn');
  const alertBox = document.getElementById('registerAlert');

  function showAlert(msg, success = false) {
    alertBox.textContent = msg;
    alertBox.className = 'alert' + (success ? ' alert-success' : '');
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  btn.addEventListener('click', () => {
    const username  = document.getElementById('regUsername').value.trim();
    const email     = document.getElementById('regEmail').value.trim();
    const password  = document.getElementById('regPassword').value;
    const confirm   = document.getElementById('regConfirm').value;
    const genre     = document.getElementById('regGenre').value;
    const terms     = document.getElementById('regTerms').checked;

    // Validation
    if (!username || !email || !password || !confirm) {
      return showAlert('Please fill in all required fields.');
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return showAlert('Username must be 3–20 characters (letters, numbers, underscores only).');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return showAlert('Please enter a valid email address.');
    }
    if (password.length < 6) {
      return showAlert('Password must be at least 6 characters.');
    }
    if (password !== confirm) {
      return showAlert('Passwords do not match.');
    }
    if (!terms) {
      return showAlert('You must agree to the Terms of Service.');
    }

    const users = getUsers();
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      return showAlert('That username is already taken. Try another one!');
    }
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return showAlert('An account with that email already exists.');
    }

    const newUser = {
      id: Date.now(),
      username, email, password, genre,
      joined: Date.now(),
      bio: '',
      watchCount: 0
    };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser, false);

    showAlert('Account created! Redirecting...', true);
    btn.disabled = true;
    setTimeout(() => window.location.href = 'index.html', 1200);
  });

  // Enter key support
  document.querySelectorAll('.form-input').forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
  });
});
