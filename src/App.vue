<template>
  <div id="app" class="app-container">
    <header>{{ user }} Grade {{ grade }} Dashboard</header>

    <main>
      <!-- Navbar with top/bottom items -->
      <NavbarComponent
        :itemsData="[
          { label: 'Dashboard', position: 'top' },
          { label: 'Profile', position: 'top' },
          { label: 'Settings', position: 'bottom' },
          { label: 'Logout', position: 'bottom' },
        ]"
        backgroundColor="#6fd2be"
        textColor="#fff"
        hoverColor="#06977a"
        width="220px"
        collapsedWidth="60px"
        itemFontSize="18px"
        @itemClick="handleItemClick"
      />

      <!-- Main content -->
      <div class="content-area">
        <h2>Welcome, {{ user }}!</h2>
        <p>Select an item from the sidebar to continue.</p>
      </div>
    </main>

    <footer>&copy; 2025 Master Learning &trade;. All rights reserved.</footer>
  </div>
</template>

<script>
  import NavbarComponent from './components/NavbarComponent.vue'

  export default {
    name: 'App',
    components: {
      NavbarComponent,
    },
    data() {
      return {
        user: 'User',
        grade: 'Five',
      }
    },
    methods: {
      handleItemClick(item) {
        alert(`You clicked on ${item.label}`)
      },
    },
  }
</script>

<style>
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #app {
    height: 100%;
    font-family: Arial, sans-serif;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    background-color: #0bbb98;
    color: white;
    padding: 20px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
  }

  main {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  .content-area {
    flex: 1; /* take remaining width */
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow: auto;
  }

  footer {
    background-color: #0bbb98;
    color: white;
    text-align: center;
    padding: 15px;
    font-size: 16px;
    margin-top: auto;
  }

  /* Responsive */
  @media (max-width: 768px) {
    main {
      flex-direction: column;
    }
  }
</style>
