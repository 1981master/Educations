<template>
  <div id="app" class="app-container">
    <!-- Header + Navbar only if logged in -->
    <header v-if="isLoggedIn">
      <img src="@/assets/app.png" alt="App Icon" class="app-icon" />
      {{ user }} Grade {{ grade }} Dashboard
      <span class="sparkle">✨</span>
    </header>

    <main>
      <NavbarComponent
        v-if="isLoggedIn"
        :itemsData="menuItems"
        backgroundColor="#6fd2be"
        textColor="#fff"
        hoverColor="#06977a"
        width="220px"
        collapsedWidth="60px"
        itemFontSize="18px"
        @itemClick="handleItemClick"
      />

      <!-- Router outlet always visible -->
      <div class="content-area">
        <router-view @loginSuccess="isLoggedIn = true" />
      </div>
    </main>

    <footer v-if="isLoggedIn">
      © {{ new Date().getFullYear() }} Practice Master Learning &trade;. All
      rights reserved.
    </footer>
  </div>
</template>

<script>
  import NavbarComponent from './components/NavbarComponent.vue'

  export default {
    name: 'App',
    components: { NavbarComponent },
    data() {
      return {
        isLoggedIn: !!localStorage.getItem('authToken'),
        user: localStorage.getItem('username') || '',
        grade: localStorage.getItem('grade') || '',
        menuItems: [
          { label: 'Dashboard', position: 'top', route: '/dashboard' },
          { label: 'Kinder Garden', position: 'top', route: '/kindergarten' },
          { label: 'Profile', position: 'top', route: '/profile' },
          {
            label: 'First Grade',
            position: 'top',
            children: [
              { label: 'Diosaur Explorer 🔐', route: '/fifth-grade/game13' },
              { label: 'Trinagle Game', route: '/first-grade' },
              { label: 'Animal Explorer', route: '/animalExplorer' },
            ],
          },
          {
            label: 'Fifth Grade',
            position: 'top',
            children: [
              { label: 'Prime Numbers', route: '/fifth-grade/game1' },
              { label: 'Fractions Puzzle', route: '/fifth-grade/game2' },
              { label: 'Geometry Explorer', route: '/fifth-grade/game3' },
              { label: 'Math Riddles', route: '/fifth-grade/game4' },
              { label: 'Logic Maze', route: '/fifth-grade/game5' },
              { label: 'Equation Balance', route: '/fifth-grade/game6' },
              { label: 'Fraction Pizza Maker 🍕', route: '/fifth-grade/game7' },
              { label: 'Multiplication Race 🚗', route: '/fifth-grade/game8' },
              { label: 'Decimal Quest 🏰', route: '/fifth-grade/game9' },
              {
                label: 'Percentage Treasure Hunt 💎',
                route: '/fifth-grade/game10',
              },
              {
                label: 'Coordinate Battleship ⚓',
                route: '/fifth-grade/game11',
              },
              {
                label: 'Word Problem Escape Room 🔐',
                route: '/fifth-grade/game12',
              },
              {
                label: 'Word Problem Escape Room 🔐',
                route: '/fifth-grade/game13',
              },
              { label: 'Science Exploere', route: '/fifth-grade/game14' },
              { label: 'Reading Explorer', route: '/fifth-grade/game15' },
              { label: 'Math Play Ground', route: '/fifth-grade/game16' },
            ],
          },
          { label: 'Settings', position: 'bottom', route: '/settings' },
          { label: 'Logout', position: 'bottom', route: '/logout' },
        ],
      }
    },
    methods: {
      handleItemClick(item) {
        if (item.route === '/logout') {
          this.logout()
        } else if (item.route) {
          this.$router.push(item.route)
        }
      },
      logout() {
        this.isLoggedIn = false
        this.user = ''
        this.grade = ''
        localStorage.clear()
        this.$router.push('/login')
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-bottom: 5px dashed #05a17d;
    position: relative;
  }

  header .app-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: bounce 1s infinite alternate;
  }

  header .sparkle {
    font-size: 32px;
    animation: sparkle 1.5s infinite;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes sparkle {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.2) rotate(20deg);
    }
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
