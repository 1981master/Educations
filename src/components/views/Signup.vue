<template>
  <div class="signup-page">
    <!-- Header -->
    <header class="header">
      <h2>
        Practice & Master Learning A fun way of Practice for kids & parents
      </h2>
    </header>

    <!-- Form Container -->
    <main class="form-container">
      <form @submit.prevent="onFinish" class="signup-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            required
            placeholder="Enter your username"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            placeholder="Enter your password"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            required
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit" class="btn-primary">Sign Up</button>

        <p class="login-link">
          Already have an account?
          <button type="button" class="login-button" @click="login">
            Log in
          </button>
        </p>
      </form>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>
        © {{ new Date().getFullYear() }} Practice Master Learning ™. All
        rights reserved.
      </p>
    </footer>

    <!-- Verification / Error Modal -->
    <div v-if="showPopup" class="modal-overlay">
      <div class="modal">
        <h3>{{ popupError ? 'Signup Error' : 'Enter Verification Code' }}</h3>
        <div v-if="popupError">{{ popupError }}</div>
        <div v-else>
          <p>
            We have sent a verification code to
            {{ pendingUser || 'your email' }}.
          </p>
          <input
            type="text"
            v-model="verificationCode"
            placeholder="Enter code"
            @keyup.enter="submitCode"
          />
        </div>
        <div class="modal-buttons">
          <button @click="closePopup">Close</button>
          <button v-if="!popupError" @click="submitCode">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { emailVerification } from '@/services/emailVerification' // adjust path
  import { signup } from '@/services/signup'
  import axios from 'axios'

  export default {
    name: 'Signup',
    data() {
      return {
        form: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        showPopup: false,
        pendingUser: null,
        popupError: null,
        verificationCode: '',
      }
    },
    methods: {
      login() {
        this.$router.push('/login') // Fixed routing
      },
      async onFinish() {
        const { username, email, password, confirmPassword } = this.form

        if (password !== confirmPassword) {
          alert('Passwords do not match')
          return
        }

        try {
          const userData = { username, email, password }
          await signup(userData)
          alert('Account created successfully!')

          // Send verification code
          try {
            await emailVerification({ email })
            console.log('send verification code to email: ', email)
          } catch (err) {
            console.log('Issue sending verification code to email: ', email)
          }

          this.pendingUser = email
          this.popupError = null
          this.showPopup = true
        } catch (err) {
          console.error(err)
          this.popupError =
            err.response?.data?.message || err.response?.data || 'Signup failed'
          this.showPopup = true
        }
      },
      async submitCode() {
        try {
          await axios.post('http://localhost:8080/api/auth/verify-code', {
            email: this.pendingUser,
            code: this.verificationCode,
          })
          alert('Verification successful!')
          this.closePopup()
          this.$router.push('/login')
        } catch (err) {
          alert(err.response?.data || 'Invalid or expired code')
        }
      },
      closePopup() {
        this.showPopup = false
        this.popupError = null
        this.verificationCode = ''
        this.form.password = ''
        this.form.confirmPassword = ''
      },
    },
  }
</script>

<style scoped>
  .signup-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
  }

  .header {
    background-color: #576feb;
    padding: 16px;
    text-align: center;
    color: white;
  }

  .form-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }

  .signup-form {
    width: 100%;
    max-width: 400px;
    background: #fff;
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
  }

  .form-group input {
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .btn-primary {
    width: 100%;
    padding: 10px;
    background-color: #576feb;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .login-link {
    text-align: center;
    margin-top: 12px;
  }

  .footer {
    background-color: #576feb;
    padding: 12px;
    text-align: center;
    color: white;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #fff;
    padding: 24px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
  }

  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }

  .modal-buttons button {
    margin-left: 8px;
    padding: 6px 12px;
    cursor: pointer;
  }
  .login-button {
    background: none;
    border: none;
    color: #576feb;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    text-decoration: underline;
  }

  .login-button:hover {
    color: #3742fa;
  }
  .login-button {
    background: none;
    border: none;
    color: #576feb;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    text-decoration: underline;
  }

  .login-button:hover {
    color: #3742fa;
  }
</style>
