<template>
  <div class="multiplication-explorer">
    <h2>🧮 Fun Multiplication Table (1-10)</h2>
    <p>Click a multiplication problem to see it light up with fun emojis!</p>

    <div class="table-grid">
      <div v-for="row in 10" :key="'row-' + row" class="table-row">
        <div
          v-for="col in 10"
          :key="'cell-' + row + '-' + col"
          class="table-cell"
          @click="animateMultiplication(row, col)"
        >
          {{ row }} × {{ col }}
        </div>
      </div>
    </div>

    <transition-group name="emoji-pop" tag="div" class="emoji-display">
      <div
        v-for="(emoji, index) in displayedEmojis"
        :key="index"
        class="emoji"
        :style="{ animationDelay: index * 0.1 + 's' }"
      >
        {{ emoji }}
      </div>
    </transition-group>

    <div v-if="currentProblem" class="problem-label">
      <p>
        💡 {{ currentProblem.a }} × {{ currentProblem.b }} =
        {{ currentProblem.a * currentProblem.b }}
      </p>
    </div>

    <div class="controls">
      <button @click="resetDisplay">Reset</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        displayedEmojis: [],
        emojiList: ['🍎', '🍌', '🍇', '🌟', '⚡', '🍒', '🍉', '🍓', '🍑', '🍍'],
        currentProblem: null,
      }
    },
    methods: {
      animateMultiplication(a, b) {
        this.displayedEmojis = []
        this.currentProblem = { a, b }
        let total = a * b
        for (let i = 0; i < total; i++) {
          setTimeout(() => {
            // Pick random emoji for fun
            const emoji =
              this.emojiList[Math.floor(Math.random() * this.emojiList.length)]
            this.displayedEmojis.push(emoji)
          }, i * 120) // faster animation
        }
      },
      resetDisplay() {
        this.displayedEmojis = []
        this.currentProblem = null
      },
    },
  }
</script>

<style scoped>
  .multiplication-explorer {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    text-align: center;
    padding: 20px;
    background: linear-gradient(135deg, #fffae3, #ffd6a5);
  }

  .table-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 5px;
    margin-bottom: 20px;
  }

  .table-cell {
    background: #fffbea;
    padding: 12px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: bold;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }

  .table-cell:hover {
    transform: scale(1.2);
    box-shadow: 0 0 15px 5px #ffdd99;
  }

  .emoji-display {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
    justify-items: center;
    gap: 5px;
    margin-top: 20px;
  }

  .emoji {
    font-size: 2.2rem;
    animation: bounce 0.6s ease forwards;
  }

  @keyframes bounce {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }
    50% {
      transform: translateY(10px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .problem-label {
    margin-top: 20px;
    font-size: 1.3rem;
    font-weight: bold;
    color: #ff6f61;
    text-shadow: 1px 1px 2px #fff;
  }

  .controls {
    margin-top: 15px;
  }

  button {
    padding: 10px 20px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    background: #fffae3;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px #ffdd99;
  }
</style>
