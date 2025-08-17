<template>
  <div id="app" class="app-container">
    <header>{{ user }} Grade {{ grade }} Dashboard</header>

    <main>
      <NavbarComponent
        :itemsData="[
          { label: 'Dashboard', position: 'top', route: '/' },
          { label: 'Kinder Garden', position: 'top', route: '/kindergarten' },
          { label: 'Profile', position: 'top', route: '/profile' },
          { label: 'First Grade', position: 'top', route: '/first-grade' },
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
            ],
          },
          { label: 'Settings', position: 'bottom', route: '/settings' },
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

      <!-- Main content rendered via routing -->
      <div class="content-area">
        <router-view />
      </div>
    </main>

    <footer>&copy; 2025 Master Learning &trade;. All rights reserved.</footer>
  </div>
</template>

<script>
  import EmojiGame from './components/FirstGradeComponents/EmojiGame.vue'
  import NavbarComponent from './components/NavbarComponent.vue'

  export default {
    name: 'App',
    components: {
      NavbarComponent,
      EmojiGame,
    },
    data() {
      return {
        user: 'User',
        grade: 'Five',
      }
    },
    methods: {
      handleItemClick(item) {
        if (item.route) {
          this.$router.push(item.route)
        } else {
        }
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
