<template>
  <div class="first-grade-game">
    <h2>Find the shape with {{ correctSides }} sides!</h2>
    <p>Click the correct shape before time runs out ⏱️</p>

    <div class="shapes-container">
      <div
        v-for="(shape, index) in shapes"
        :key="index"
        class="shape-box"
        @click="checkAnswer(shape.sides)"
      >
        <svg viewBox="-50 -50 100 100" width="80" height="80">
          <polygon
            :points="shape.points"
            fill="#6fd2be"
            stroke="#000"
            stroke-width="2"
          />
        </svg>
        <div class="label">{{ shape.name }}</div>
      </div>
    </div>

    <p class="message">{{ message }}</p>

    <button v-if="correct || timeUp" class="next-button" @click="nextRound">
      Next Round 🎉
    </button>

    <p>Time left: {{ timer }}s | Score: {{ score }}</p>
  </div>
  <div>
    <BtnComponent
      label="Next Level (Triangles) 🔺"
      v-if="correct || timeUp"
      @click="goToTriangles"
    ></BtnComponent>
  </div>
</template>

<script>
  import BtnComponent from '../BtnComponent.vue'

  export default {
    name: 'FirstGradeGame',
    components: { BtnComponent },
    data() {
      return {
        allShapes: [
          { name: 'Triangle', sides: 3 },
          { name: 'Square', sides: 4 },
          { name: 'Pentagon', sides: 5 },
          { name: 'Hexagon', sides: 6 },
          { name: 'Heptagon', sides: 7 },
          { name: 'Octagon', sides: 8 },
          { name: 'Nonagon', sides: 9 },
          { name: 'Decagon', sides: 10 },
          { name: 'Diamond', sides: 4, diamond: true },
          { name: 'Star', sides: 5, star: true },
          { name: 'Triangle2', sides: 3 },
          { name: 'Square2', sides: 4 },
          { name: 'Pentagon2', sides: 5 },
          { name: 'Hexagon2', sides: 6 },
          { name: 'Heptagon2', sides: 7 },
          { name: 'Octagon2', sides: 8 },
        ],
        shapes: [],
        correctSides: 0,
        timer: 20,
        intervalId: null,
        correct: false,
        timeUp: false,
        message: '',
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
      goToTriangles() {
        this.$router.push('Triangles')
      },
      generateShapes() {
        this.shapes = this.allShapes.map((shape) => ({
          ...shape,
          points: this.createPolygonPoints(shape),
        }))
      },
      createPolygonPoints(shape) {
        if (shape.star) {
          return this.createStarPoints(5, 40, 20)
        }
        if (shape.diamond) {
          return '-40,0 0,40 40,0 0,-40'
        }
        const radius = 40
        const sides = shape.sides
        let points = ''
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides - Math.PI / 2
          const x = radius * Math.cos(angle)
          const y = radius * Math.sin(angle)
          points += `${x},${y} `
        }
        return points.trim()
      },
      createStarPoints(points, outerRadius, innerRadius) {
        let result = ''
        const step = Math.PI / points
        for (let i = 0; i < 2 * points; i++) {
          const r = i % 2 === 0 ? outerRadius : innerRadius
          const angle = i * step - Math.PI / 2
          const x = r * Math.cos(angle)
          const y = r * Math.sin(angle)
          result += `${x},${y} `
        }
        return result.trim()
      },
      pickCorrectShape() {
        const shapesWithSides = this.shapes.filter((s) => s.sides <= 10)
        const randomIndex = Math.floor(Math.random() * shapesWithSides.length)
        this.correctSides = shapesWithSides[randomIndex].sides
      },
      nextRound() {
        this.correct = false
        this.timeUp = false
        this.message = ''
        this.timer = 20
        this.generateShapes()
        this.pickCorrectShape()
        this.startTimer()
      },
      startTimer() {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(() => {
          this.timer--
          if (this.timer <= 0) {
            this.timeUp = true
            this.message = '⏰ Time is up!'
            clearInterval(this.intervalId)
          }
        }, 1000)
      },
      checkAnswer(sides) {
        if (sides === this.correctSides) {
          this.message = '🎉 Correct!'
          this.correct = true
          this.score++
          this.correctSound.play()
          clearInterval(this.intervalId)
        } else {
          this.message = '❌ Try again!'
          this.wrongSound.play()
        }
      },
    },
    beforeUnmount() {
      clearInterval(this.intervalId)
    },
  }
</script>

<style scoped>
  .first-grade-game {
    text-align: center;
    margin-top: 20px;
  }

  .shapes-container {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
  }

  .shape-box {
    cursor: pointer;
    transition: transform 0.2s;
    text-align: center;
  }

  .shape-box:hover {
    transform: scale(1.2);
  }

  .label {
    margin-top: 5px;
    font-weight: bold;
    font-size: 0.9rem;
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
