<template>
  <div class="profile">
    <h1>Profile Page</h1>
    <p>Welcome to your profile, {{ user.name }}!</p>

    <div class="details">
      <h3>User Details</h3>
      <ul>
        <li>
          <strong>Name:</strong>
          {{ user.name }}
        </li>
        <li>
          <strong>Email:</strong>
          {{ user.email }}
        </li>
        <li>
          <strong>Joined:</strong>
          {{ user.joined }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    data() {
      return {
        user: {
          name: 'Your Name here...',
          email: 'john@example.com',
          joined: '2024-01-01',
        },
      }
    },
  }
</script>

<style scoped>
  .profile {
    padding: 2rem;
  }

  .details {
    margin-top: 1rem;
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
  }
</style>
