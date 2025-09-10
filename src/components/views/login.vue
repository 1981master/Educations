<template>
  <div class="login-page">
    <!-- Header -->
    <header class="header">
      <h2>🛍️ Practice & Master Learning</h2>
      <p class="subtitle">A fun way of Practice for kids & parents</p>
    </header>

    <!-- Login Form -->
    <div class="form-container">
      <form @submit.prevent="onFinish" class="login-form">
        <h3 class="form-title">Log In</h3>

        <div class="form-group">
          <label for="username">👤 Username</label>
          <input
            id="username"
            type="text"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">🔒 Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="btn-primary">Log In</button>

        <p class="signup-text">
          Don't have an account?
          <router-link to="/signup">✨ Register now</router-link>
        </p>
      </form>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p>
        © {{ new Date().getFullYear() }} Practice Master Learning &trade;. All
        rights reserved. 🎉
      </p>
    </footer>

    <!-- Error Modal -->
    <div v-if="showError" class="modal-overlay" @click="closeError">
      <div class="modal-content" @click.stop>
        <h3>⚠️ Login Error</h3>
        <p>{{ errorMessage }}</p>
        <button @click="closeError">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/services/login'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        showError: false,
        errorMessage: '',
      }
    },
    methods: {
      async onFinish() {
        try {
          const response = await login({
            username: this.username,
            password: this.password,
          })
          const token = response.data.token

          // Store auth info in localStorage
          localStorage.setItem('authToken', token)
          localStorage.setItem('username', this.username)
          localStorage.setItem('grade', 'Five') // adjust dynamically if needed
          this.$emit('loginSuccess')
          // Redirect to main dashboard
          this.$router.push('/dashboard')
        } catch (err) {
          console.log('login error: ', err)
          this.errorMessage =
            err.message === 'Network Error'
              ? 'Network Issue. Try again later.'
              : 'Invalid credentials'
          this.showError = true
        }
      },
      closeError() {
        this.showError = false
        this.errorMessage = ''
      },
    },
  }
</script>

<style scoped>
  /* General Layout */
  .login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #a8dadc, #f1faee);
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }

  /* Header */
  .header {
    background-color: #457b9d;
    padding: 20px 0;
    text-align: center;
    color: white;
  }
  .header h2 {
    margin: 0;
    font-size: 28px;
  }
  .subtitle {
    margin: 5px 0 0;
    font-size: 14px;
    color: #f1faee;
  }

  /* Form */
  .form-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }
  .login-form {
    background-color: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
  }
  .form-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 22px;
    color: #1d3557;
  }
  .form-group {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
  }
  .form-group label {
    margin-bottom: 8px;
    font-weight: bold;
    color: #1d3557;
  }
  .form-group input {
    padding: 10px;
    font-size: 15px;
    border: 2px solid #a8dadc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s;
  }
  .form-group input:focus {
    border-color: #457b9d;
  }

  /* Button */
  .btn-primary {
    padding: 12px;
    font-size: 18px;
    background-color: #e63946;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: bold;
    transition:
      background-color 0.3s,
      transform 0.1s;
  }
  .btn-primary:hover {
    background-color: #d62828;
    transform: scale(1.05);
  }

  /* Signup text */
  .signup-text {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
  }
  .signup-text a {
    color: #457b9d;
    font-weight: bold;
    text-decoration: none;
  }
  .signup-text a:hover {
    text-decoration: underline;
  }

  /* Footer */
  .footer {
    background-color: #457b9d;
    padding: 14px 0;
    text-align: center;
    color: white;
    font-size: 13px;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background-color: white;
    padding: 24px;
    border-radius: 12px;
    width: 320px;
    text-align: center;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }
  .modal-content h3 {
    margin-bottom: 12px;
    color: #e63946;
  }
  .modal-content button {
    margin-top: 16px;
    padding: 10px 20px;
    background-color: #457b9d;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  .modal-content button:hover {
    background-color: #1d3557;
  }
</style>
