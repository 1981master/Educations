<template>
  <div class="triangle-count-game">
    <h2>How many triangles are inside this shape?</h2>
    <p>Click the correct number! (Shapes with less than 10 triangles)</p>
    <div class="shape-container">
      <svg viewBox="0 0 200 200" width="200" height="200">
        <polygon
          :points="shapePoints"
          fill="#6fd2be"
          stroke="#000"
          stroke-width="2"
        />
        <line
          v-for="(line, index) in shapeLines"
          :key="index"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          stroke="#000"
          stroke-width="1"
        />
      </svg>
    </div>

    <div class="options">
      <button v-for="n in 10" :key="n" @click="checkAnswer(n)">
        {{ n }}
      </button>
    </div>

    <p class="message">{{ message }}</p>
    <button v-if="correct || timeUp" class="next-button" @click="nextRound">
      Next Round 🎉
    </button>
    <p>Score: {{ score }}</p>
  </div>
  <div>
    <BtnComponent
      label="Next Level (Shape Buzz)"
      @click="goToShapeBuzzle"
    ></BtnComponent>
  </div>
</template>

<script>
  import BtnComponent from '../BtnComponent.vue'

  export default {
    name: 'TriangleCountGame',
    components: {
      BtnComponent,
    },
    data() {
      return {
        shapeLines: [],
        shapePoints: '',
        correctCount: 0,
        message: '',
        correct: false,
        timeUp: false,
        score: 0,
        correctSound: null,
        wrongSound: null,
      }
    },
    created() {
      this.correctSound = new Audio('/correct.mp3')
      this.wrongSound = new Audio('/wrong.mp3')
      this.nextRound()
    },
    methods: {
      goToShapeBuzzle() {
        this.$router.push('ShapePuzzle')
      },
      generateShape() {
        // Randomly pick number of triangles inside (less than 10)
        this.correctCount = Math.floor(Math.random() * 9) + 1

        // Example: draw a big triangle and divide into smaller triangles
        const size = 180
        this.shapePoints = `0,${size} ${size / 2},0 ${size},${size}`

        // Generate lines to represent triangles inside
        this.shapeLines = []
        const step = size / this.correctCount
        for (let i = 1; i < this.correctCount; i++) {
          this.shapeLines.push({
            x1: (i * step) / 2,
            y1: size - i * step,
            x2: i * step + size / 4,
            y2: size,
          })
        }
      },
      checkAnswer(selected) {
        if (selected === this.correctCount) {
          this.message = '🎉 Correct!'
          this.correct = true
          this.score++
          this.correctSound.play()
        } else {
          this.message = '❌ Try again!'
          this.wrongSound.play()
        }
      },
      nextRound() {
        this.correct = false
        this.timeUp = false
        this.message = ''
        this.generateShape()
      },
    },
  }
</script>

<style scoped>
  .triangle-count-game {
    text-align: center;
    margin-top: 20px;
  }

  .shape-container {
    margin: 20px auto;
  }

  .options button {
    font-size: 1.2rem;
    margin: 5px;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background-color: #6fd2be;
    color: #000;
    transition: transform 0.2s;
  }

  .options button:hover {
    transform: scale(1.1);
    background-color: #0bbb98;
    color: white;
  }

  .next-button {
    margin-top: 15px;
    padding: 10px 22px;
    font-size: 1.2rem;
    background-color: #0bbb98;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .message {
    font-size: 1.4rem;
    margin-top: 12px;
  }
</style>
