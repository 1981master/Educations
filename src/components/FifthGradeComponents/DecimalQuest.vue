<template>
  <div class="treasure-hunt">
    <h2>Percentage Treasure Hunt 💎</h2>
    <p>
      Click on a shape to answer a percentage question and reveal the treasure!
    </p>

    <div class="grid">
      <div
        v-for="(cell, index) in grid"
        :key="index"
        class="grid-cell"
        :class="{ found: cell.found }"
        @click="selectCell(index)"
      >
        <span v-if="cell.found" class="treasure">💰</span>
        <span v-else class="shape" :class="cell.shape">
          {{ cell.shapeSymbol }}
        </span>
      </div>
    </div>

    <div v-if="currentQuestion" class="question-popup">
      <p>{{ currentQuestion.text }}</p>
      <div class="options">
        <button
          v-for="(opt, i) in currentQuestion.options"
          :key="i"
          @click="checkAnswer(opt)"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <div class="scoreboard">
      Treasures found: {{ treasuresFound }} / {{ grid.length }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PercentageTreasureHunt',
    data() {
      return {
        grid: [],
        shapes: [
          { type: 'circle', symbol: '●' },
          { type: 'square', symbol: '■' },
          { type: 'triangle', symbol: '▲' },
          { type: 'star', symbol: '★' },
        ],
        currentQuestion: null,
        currentIndex: null,
        treasuresFound: 0,
        questions: [
          { text: 'What is 25% of 80?', answer: 20 },
          { text: '50% of which number is 30?', answer: 60 },
          { text: 'What is 10% of 200?', answer: 20 },
          { text: '40% of 50 is?', answer: 20 },
          { text: '75% of 120?', answer: 90 },
        ],
      }
    },
    created() {
      this.initGrid()
    },
    methods: {
      initGrid() {
        this.grid = Array.from({ length: 16 }, () => {
          const s = this.shapes[Math.floor(Math.random() * this.shapes.length)]
          return { shape: s.type, shapeSymbol: s.symbol, found: false }
        })
      },
      selectCell(index) {
        if (this.grid[index].found || this.currentQuestion) return
        this.currentIndex = index
        const q =
          this.questions[Math.floor(Math.random() * this.questions.length)]
        const options = this.generateOptions(q.answer)
        this.currentQuestion = { ...q, options }
      },
      generateOptions(correct) {
        const opts = new Set()
        opts.add(correct)
        while (opts.size < 4) {
          const r = Math.floor(Math.random() * 100) + 1
          opts.add(r)
        }
        return this.shuffleArray([...opts])
      },
      shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
      },
      checkAnswer(answer) {
        if (answer === this.currentQuestion.answer) {
          this.grid[this.currentIndex].found = true
          this.treasuresFound++
        } else {
          this.playWrongSound()
          alert('Oops! Wrong answer. Try another shape!')
        }
        this.currentQuestion = null
        this.currentIndex = null
      },
      playWrongSound() {
        const audio = new Audio('/wrong.mp3') // put wrong.mp3 in public folder
        audio.play()
      },
    },
  }
</script>

<style scoped>
  .treasure-hunt {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Comic Sans MS', Arial, sans-serif;
    background: linear-gradient(to bottom, #c3f0f0, #f0f8ff);
    padding: 20px;
    min-height: 100vh;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 80px);
    gap: 12px;
    margin: 20px 0;
  }

  .grid-cell {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #ffffff, #e0f7fa);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 32px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition:
      transform 0.2s,
      background 0.3s;
  }

  .grid-cell:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, #b2ebf2, #80deea);
  }

  .grid-cell.found {
    background: linear-gradient(135deg, #ffecb3, #ffd54f);
    cursor: default;
  }

  .shape {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    font-weight: bold;
    text-shadow: 1px 1px 2px #00000066;
  }

  .shape.circle {
    background-color: #f06292;
  }
  .shape.square {
    background-color: #ba68c8;
  }
  .shape.triangle {
    background-color: #4db6ac;
  }
  .shape.star {
    background-color: #ffd54f;
    color: #000;
  }

  .question-popup {
    background: #fff3b0;
    padding: 20px;
    border: 2px solid #f5c518;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .options button {
    margin: 5px;
    padding: 10px 16px;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;
    font-weight: bold;
    background-color: #4dd0e1;
    color: white;
  }

  .options button:hover {
    background-color: #00acc1;
  }

  .scoreboard {
    font-size: 20px;
    font-weight: bold;
    margin-top: 15px;
  }
</style>
