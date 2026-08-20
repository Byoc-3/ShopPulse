// =====================================================
// SHOPPULSE — LOGIN & SIGNUP (no backend, simulated)
// =====================================================

// -------- LOGIN FORM --------
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const emailError = document.getElementById('login-email-error');
    const passwordError = document.getElementById('login-password-error');

    // Clear old errors
    emailError.textContent = '';
    passwordError.textContent = '';

    let hasError = false;

    if (!email) {
      emailError.textContent = 'Email is required.';
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = 'Password is required.';
      hasError = true;
    }

    if (hasError) return;

    // Simulate a successful login (no real backend check)
    localStorage.setItem('shopPulseUser', JSON.stringify({ email: email }));

    alert('Login successful! Welcome back to ShopPulse.');
    window.location.href = '../index.html';
  });
}

// -------- SIGNUP FORM --------
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

    const nameError = document.getElementById('signup-name-error');
    const emailError = document.getElementById('signup-email-error');
    const passwordError = document.getElementById('signup-password-error');
    const confirmPasswordError = document.getElementById('signup-confirm-password-error');

    // Clear old errors
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    let hasError = false;

    if (!name) {
      nameError.textContent = 'Full name is required.';
      hasError = true;
    }

    if (!email) {
      emailError.textContent = 'Email is required.';
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = 'Password is required.';
      hasError = true;
    } else if (password.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters.';
      hasError = true;
    }

    if (password !== confirmPassword) {
      confirmPasswordError.textContent = 'Passwords do not match.';
      hasError = true;
    }

    if (hasError) return;

    // Simulate a successful signup (no real backend, just save locally)
    localStorage.setItem('shopPulseUser', JSON.stringify({ name: name, email: email }));

    alert('Account created successfully! Welcome to ShopPulse, ' + name + '.');
    window.location.href = 'login.html';
  });
}