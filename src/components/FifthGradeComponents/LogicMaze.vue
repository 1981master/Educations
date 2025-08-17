<template>
  <div class="logic-maze p-6 rounded-2xl shadow-lg max-w-xl mx-auto">
    <h2 class="text-2xl font-bold text-green-700 mb-4">🧠 Logic Maze</h2>
    <p class="mb-4">
      Help the robot reach the treasure! Click a valid cell to move.
    </p>

    <!-- Maze Grid -->
    <div class="maze-grid">
      <div
        v-for="(row, rIndex) in maze"
        :key="'row-' + rIndex"
        class="maze-row"
      >
        <div
          v-for="(cell, cIndex) in row"
          :key="'cell-' + rIndex + '-' + cIndex"
          :class="['maze-cell', cellClass(rIndex, cIndex)]"
          @click="moveTo(rIndex, cIndex)"
        >
          <span v-if="playerPos.row === rIndex && playerPos.col === cIndex">
            🤖
          </span>
          <span v-else-if="cell === 'goal'">💎</span>
        </div>
      </div>
    </div>

    <!-- Feedback -->
    <div v-if="message" class="message mt-3">{{ message }}</div>

    <!-- Actions -->
    <div class="actions mt-4">
      <button @click="resetMaze" class="btn">Reset</button>
      <button @click="hintMaze" class="btn">Hint</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LogicMaze',
    data() {
      return {
        size: 10,
        maze: [],
        playerPos: { row: 0, col: 0 },
        message: '',
        path: [],
      }
    },
    created() {
      this.generateMaze()
    },
    methods: {
      generateMaze() {
        // Create empty maze with some walls
        const newMaze = []
        for (let i = 0; i < this.size; i++) {
          const row = []
          for (let j = 0; j < this.size; j++) {
            row.push(Math.random() < 0.2 ? 'wall' : '')
          }
          newMaze.push(row)
        }
        // Set start and goal
        newMaze[0][0] = 'start'
        newMaze[this.size - 1][this.size - 1] = 'goal'
        this.maze = newMaze
        this.playerPos = { row: 0, col: 0 }
        this.message = ''
        this.path = []
      },
      cellClass(row, col) {
        if (this.playerPos.row === row && this.playerPos.col === col)
          return 'player'
        if (this.maze[row][col] === 'wall') return 'wall'
        if (this.maze[row][col] === 'goal') return 'goal'
        if (this.path.some((p) => p.row === row && p.col === col)) return 'path'
        return ''
      },
      moveTo(row, col) {
        // Check adjacency
        const dr = Math.abs(row - this.playerPos.row)
        const dc = Math.abs(col - this.playerPos.col)
        if (this.maze[row][col] === 'wall') {
          this.message = "🚫 Can't move into wall!"
          return
        }
        if (dr + dc === 1) {
          this.playerPos = { row, col }
          this.message = ''
          if (this.maze[row][col] === 'goal') {
            this.message = '🎉 You reached the treasure!'
            this.showPath()
          }
        } else {
          this.message = '🚫 Click only an adjacent cell!'
        }
      },
      showPath() {
        // Simple BFS to highlight shortest path
        const queue = [{ row: 0, col: 0, path: [] }]
        const visited = Array(this.size)
          .fill(0)
          .map(() => Array(this.size).fill(false))
        visited[0][0] = true

        while (queue.length) {
          const current = queue.shift()
          const { row, col, path } = current
          const newPath = [...path, { row, col }]

          if (row === this.size - 1 && col === this.size - 1) {
            this.path = newPath
            return
          }

          const dirs = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
          ]
          for (const [dr, dc] of dirs) {
            const nr = row + dr
            const nc = col + dc
            if (
              nr >= 0 &&
              nr < this.size &&
              nc >= 0 &&
              nc < this.size &&
              !visited[nr][nc] &&
              this.maze[nr][nc] !== 'wall'
            ) {
              visited[nr][nc] = true
              queue.push({ row: nr, col: nc, path: newPath })
            }
          }
        }
      },
      resetMaze() {
        this.generateMaze()
      },
      hintMaze() {
        this.showPath()
        this.message = '💡 Highlighted the shortest path!'
      },
    },
  }
</script>

<style scoped>
  .logic-maze {
    background: #f0fff4;
    border: 2px solid #34d399;
  }
  .maze-grid {
    display: grid;
    gap: 2px;
    margin-bottom: 10px;
  }
  .maze-row {
    display: flex;
  }
  .maze-cell {
    width: 40px;
    height: 40px;
    border: 1px solid #34d399;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .maze-cell.player {
    background-color: #6ee7b7;
  }
  .maze-cell.wall {
    background-color: #9ca3af;
  }
  .maze-cell.goal {
    background-color: #fcd34d;
  }
  .maze-cell.path {
    background-color: #d9f99d;
  }
  .btn {
    background: #10b981;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: bold;
    margin-right: 5px;
    transition: 0.3s;
  }
  .btn:hover {
    background: #059669;
  }
  .message {
    font-weight: bold;
  }
</style>
