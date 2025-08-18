<template>
  <div class="battleship-game">
    <h2>Coordinate Battleship</h2>
    <p>Click the squares to find all hidden ships!</p>

    <div class="grid">
      <div
        v-for="(cell, index) in grid"
        :key="index"
        class="cell"
        :class="{
          hit: cell.status === 'hit',
          miss: cell.status === 'miss',
        }"
        @click="attackCell(index)"
      >
        {{ cell.status === 'hit' ? '💥' : cell.status === 'miss' ? '❌' : '' }}
      </div>
    </div>

    <div class="info">
      <p>{{ message }}</p>
      <p>
        Attempts: {{ attempts }} | Ships found: {{ shipsFound }}/{{
          totalShips
        }}
      </p>
      <button @click="resetGame">Reset</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CoordinateBattleship',
    data() {
      return {
        rows: 5,
        cols: 5,
        totalShips: 5,
        grid: [],
        shipPositions: [],
        attempts: 0,
        shipsFound: 0,
        message: '',
      }
    },
    created() {
      this.initGame()
    },
    methods: {
      initGame() {
        this.grid = Array(this.rows * this.cols)
          .fill()
          .map(() => ({ status: null }))

        const positions = new Set()
        while (positions.size < this.totalShips) {
          positions.add(Math.floor(Math.random() * this.rows * this.cols))
        }
        this.shipPositions = Array.from(positions)

        this.attempts = 0
        this.shipsFound = 0
        this.message = ''
      },
      attackCell(index) {
        if (this.grid[index].status) return

        this.attempts++
        if (this.shipPositions.includes(index)) {
          this.grid[index].status = 'hit'
          this.shipsFound++
          this.message = '🎉 Hit! Keep going!'
        } else {
          this.grid[index].status = 'miss'
          this.message = '❌ Miss! Try again!'
        }

        if (this.shipsFound === this.totalShips) {
          this.message = `🏆 All ships found in ${this.attempts} attempts!`
        }
      },
      resetGame() {
        this.initGame()
      },
    },
  }
</script>

<style scoped>
  .battleship-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    color: #222;
    background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
    padding: 20px;
    border-radius: 15px;
    width: fit-content;
    margin: 20px auto;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 70px);
    gap: 5px;
    margin: 20px 0;
  }

  .cell {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    border: 2px solid #6fd2be;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 28px;
    background: #e0f7f4;
    transition:
      transform 0.2s,
      background 0.2s;
  }

  .cell:hover {
    transform: scale(1.1);
    background: #a0e7e0;
  }

  .cell.hit {
    background-color: #4caf50;
    color: white;
    font-size: 32px;
  }

  .cell.miss {
    background-color: #f28b82;
    color: white;
    font-size: 32px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .info button {
    margin-top: 10px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    background-color: #6fd2be;
    color: white;
    font-weight: bold;
    font-size: 16px;
    transition:
      background 0.2s,
      transform 0.2s;
  }

  .info button:hover {
    background-color: #06977a;
    transform: scale(1.05);
  }
</style>
