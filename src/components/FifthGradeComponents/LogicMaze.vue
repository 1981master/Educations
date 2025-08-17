<template>
  <div class="logic-maze">
    <h2>Logic Maze</h2>
    <p>Move your avatar 🧑 to reach the goal 🎯!</p>

    <div class="maze-grid">
      <div v-for="(row, rIndex) in maze" :key="rIndex" class="maze-row">
        <div
          v-for="(cell, cIndex) in row"
          :key="cIndex"
          :class="{
            cell: true,
            wall: cell === 1,
            visited: visited.some((p) => p.x === rIndex && p.y === cIndex),
          }"
          @click="handleClick(rIndex, cIndex)"
        >
          <span v-if="player.x === rIndex && player.y === cIndex">🧑</span>
          <span v-else-if="goal.x === rIndex && goal.y === cIndex">🎯</span>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="nextStep" :disabled="gameOver">Next Step</button>
      <button @click="backStep" :disabled="selectedPath.length <= 1">
        Back Step
      </button>
      <button @click="resetMaze">Reset Maze</button>
    </div>

    <div class="info">
      <p>Steps taken: {{ player.steps }}</p>
      <p v-if="gameOver">
        🎉 Finished! Shortest path: {{ shortestPath.length - 1 }} steps
      </p>
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
        start: { x: 0, y: 0 },
        goal: { x: 9, y: 9 },
        player: { x: 0, y: 0, steps: 0 },
        selectedPath: [],
        visited: [],
        shortestPath: [],
        gameOver: false,
        wrongSound: new Audio('/wrong.mp3'),
      }
    },
    created() {
      this.generateMaze()
    },
    methods: {
      generateMaze() {
        do {
          this.maze = Array.from({ length: this.size }, () =>
            Array.from({ length: this.size }, () =>
              Math.random() < 0.3 ? 1 : 0,
            ),
          )
          this.maze[this.start.x][this.start.y] = 0
          this.maze[this.goal.x][this.goal.y] = 0
          this.shortestPath = this.findShortestPath(this.start, this.goal)
        } while (!this.shortestPath || this.shortestPath.length < 2)
        this.resetPlayer()
      },
      handleClick(x, y) {
        if (this.gameOver) return
        if (!this.isAdjacent(x, y) || this.maze[x][y] === 1) {
          this.wrongSound.play()
          return
        }
        this.movePlayer(x, y)
      },
      isAdjacent(x, y) {
        const dx = Math.abs(x - this.player.x)
        const dy = Math.abs(y - this.player.y)
        return dx + dy === 1
      },
      movePlayer(x, y) {
        this.player.x = x
        this.player.y = y
        this.player.steps++
        this.selectedPath.push({ x, y })
        this.visited.push({ x, y })

        if (x === this.goal.x && y === this.goal.y) this.gameOver = true
      },
      nextStep() {
        if (this.gameOver) return
        const nextIndex = this.selectedPath.length
        if (nextIndex < this.shortestPath.length) {
          const next = this.shortestPath[nextIndex]
          this.movePlayer(next.x, next.y)
        }
      },
      backStep() {
        if (this.selectedPath.length <= 1) return
        this.selectedPath.pop()
        this.visited.pop()
        const last = this.selectedPath[this.selectedPath.length - 1]
        this.player.x = last.x
        this.player.y = last.y
        this.player.steps--
        this.gameOver = false
      },
      resetMaze() {
        this.generateMaze()
        this.visited = [{ ...this.start }]
        this.selectedPath = [{ ...this.start }]
      },
      resetPlayer() {
        this.player = { x: this.start.x, y: this.start.y, steps: 0 }
        this.visited = [{ ...this.start }]
        this.selectedPath = [{ ...this.start }]
        this.gameOver = false
      },
      findShortestPath(start, goal) {
        const queue = [[start]]
        const visitedArr = Array.from({ length: this.size }, () =>
          Array.from({ length: this.size }, () => false),
        )
        visitedArr[start.x][start.y] = true

        while (queue.length) {
          const path = queue.shift()
          const current = path[path.length - 1]
          if (current.x === goal.x && current.y === goal.y) return path
          ;[
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
          ].forEach(([dx, dy]) => {
            const nx = current.x + dx
            const ny = current.y + dy
            if (
              nx >= 0 &&
              nx < this.size &&
              ny >= 0 &&
              ny < this.size &&
              !visitedArr[nx][ny] &&
              this.maze[nx][ny] === 0
            ) {
              visitedArr[nx][ny] = true
              queue.push([...path, { x: nx, y: ny }])
            }
          })
        }
        return null
      },
    },
  }
</script>

<style scoped>
  .logic-maze {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .maze-grid {
    display: grid;
    grid-template-rows: repeat(10, 40px);
    gap: 2px;
  }

  .maze-row {
    display: grid;
    grid-template-columns: repeat(10, 40px);
    gap: 2px;
  }

  .cell {
    width: 40px;
    height: 40px;
    border: 1px solid #999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: background 0.2s;
    background-color: #fff;
  }

  .cell.wall {
    background-color: #333;
  }

  .cell.visited {
    background-color: #6fd2be;
  }

  .controls {
    margin-top: 15px;
    display: flex;
    gap: 10px;
  }

  .controls button {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #0bbb98;
    background-color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .controls button:hover {
    background-color: #06977a;
    color: #fff;
  }

  .info {
    margin-top: 15px;
    font-weight: bold;
  }
</style>
