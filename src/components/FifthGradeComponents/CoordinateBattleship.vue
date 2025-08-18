<template>
  <div class="battleship-game">
    <h2>Fun Battleship!</h2>
    <p>Find all the hidden ships!</p>

    <div class="grid">
      <div v-for="(row, rIndex) in board" :key="rIndex" class="row">
        <div
          v-for="(cell, cIndex) in row"
          :key="cIndex"
          class="cell"
          :class="{
            hit: cell.hit && cell.hasShip,
            miss: cell.hit && !cell.hasShip,
          }"
          @click="attackCell(rIndex, cIndex)"
        >
          {{ cell.hit && cell.hasShip ? '💥' : cell.hit ? '💦' : '' }}
        </div>
      </div>
    </div>

    <div class="info">
      <p>Score: {{ score }} / {{ totalShips }}</p>
    </div>

    <button @click="resetGame" class="reset-btn">Reset Game</button>
  </div>
</template>

<script>
  export default {
    name: 'FunBattleship',
    data() {
      return {
        rows: 10,
        cols: 10,
        totalShips: 7,
        board: [],
        ships: [],
        score: 0,
      }
    },
    created() {
      this.resetGame()
    },
    methods: {
      generateBoard() {
        const board = []
        for (let r = 0; r < this.rows; r++) {
          const row = []
          for (let c = 0; c < this.cols; c++) {
            row.push({ hit: false, hasShip: false })
          }
          board.push(row)
        }
        return board
      },
      placeShips() {
        this.ships = []
        let placed = 0
        while (placed < this.totalShips) {
          const r = Math.floor(Math.random() * this.rows)
          const c = Math.floor(Math.random() * this.cols)
          if (!this.board[r][c].hasShip) {
            this.board[r][c].hasShip = true
            this.ships.push({ row: r, col: c })
            placed++
          }
        }
      },
      attackCell(r, c) {
        const cell = this.board[r][c]
        if (cell.hit) return
        cell.hit = true
        if (cell.hasShip) {
          this.score++
        }
        if (this.score === this.totalShips) {
          alert('🎉 Congratulations! You found all the ships!')
        }
      },
      resetGame() {
        this.board = this.generateBoard()
        this.score = 0
        this.placeShips()
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
    grid-template-columns: repeat(10, 40px);
    gap: 5px;
    margin: 20px 0;
  }

  .cell {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 2px solid #6fd2be;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
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
  }

  .cell.miss {
    background-color: #f28b82;
    color: white;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .reset-btn {
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

  .reset-btn:hover {
    background-color: #06977a;
    transform: scale(1.05);
  }
</style>
