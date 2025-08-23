<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Welcome to Master Learning</h1>
    </header>

    <main class="dashboard-main">
      <section class="card">
        <h2>Overview</h2>
        <p>
          Besm ALAH Alrhman Alrheem. This is Website for helping studen
          practicing,
        </p>
      </section>

      <section class="card">
        <h2>Quick Actions</h2>
        <ul>
          <li><button @click="goTo('profile')">Go to Profile</button></li>
          <li><button @click="goTo('settings')">Open Settings</button></li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    methods: {
      goTo(page) {
        this.$router.push(`/${page}`)
      },
    },
  }
</script>

<style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f5f6fa;
    padding: 20px;
  }

  .dashboard-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .dashboard-main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  button {
    background: #007bff;
    border: none;
    color: white;
    padding: 8px 12px;
    margin-top: 8px;
    border-radius: 6px;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }
</style>
