<!-- src/components/FifthGrade/GeometryExploere.vue -->
<template>
  <div class="geometry-explorer">
    <h2>Geometry Explorer 🧮</h2>

    <!-- TEACH STEP -->
    <section v-if="step === 'teach'" class="card">
      <h3>{{ shape.name }}</h3>
      <div class="diagram" v-html="shapeDiagram"></div>

      <div class="explain">
        <p class="what">
          <strong>What is it?</strong>
          {{ shape.description }}
        </p>

        <div class="formulas">
          <p>
            <strong>Perimeter:</strong>
            {{ shape.perimeter }}
          </p>
          <p v-if="shape.area">
            <strong>Area:</strong>
            {{ shape.area }}
          </p>
        </div>

        <div class="examples">
          <p><strong>Real-life examples:</strong></p>
          <ul>
            <li v-for="(ex, i) in shape.examples" :key="i">• {{ ex }}</li>
          </ul>
        </div>
      </div>

      <button class="btn primary" @click="goToQuestion">
        I'm Ready for a Question!
      </button>
    </section>

    <!-- QUESTION STEP -->
    <section v-else-if="step === 'question'" class="card">
      <h3>Question Time 🎯</h3>
      <div class="diagram" v-html="questionDiagram"></div>
      <p class="q-text">{{ question.prompt }}</p>

      <div class="answer-row">
        <input
          v-model="answer"
          type="number"
          step="any"
          class="answer-input"
          :placeholder="question.placeholder || 'Your answer'"
          @keyup.enter="checkAnswer"
        />
        <span v-if="question.unit" class="unit">{{ question.unit }}</span>
      </div>

      <div class="actions">
        <button class="btn" @click="checkAnswer">Check Answer</button>
        <button class="btn ghost" @click="tryAnother">Try Another</button>
      </div>

      <p v-if="feedback" :class="['feedback', isCorrect ? 'ok' : 'bad']">
        {{ feedback }}
      </p>

      <div v-if="isCorrect" class="next-wrap">
        <button class="btn primary" @click="nextShape">Next Shape ➡️</button>
      </div>
    </section>

    <!-- DONE (loops back) -->
    <section v-else class="card">
      <p>Awesome work! You finished all shapes. Want to start over?</p>
      <button class="btn primary" @click="restart">Start Again 🔁</button>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'GeometryExploere',
    data() {
      return {
        index: 0,
        step: 'teach', // 'teach' | 'question' | 'done'
        answer: '',
        feedback: '',
        isCorrect: false,
        question: {
          prompt: '',
          unit: '',
          value: null,
          placeholder: '',
          meta: {}, // holds dims used for diagram rendering
        },
        shapes: [
          {
            key: 'square',
            name: 'Square',
            description: 'A polygon with 4 equal sides and 4 right angles.',
            perimeter: 'P = 4 × side',
            area: 'A = side × side',
            examples: ['Chessboard tile', 'Bathroom floor tile', 'Window pane'],
            diagram: ({ s = 80 } = {}) =>
              `<svg viewBox="0 0 160 160" width="200" height="200">
              <rect x="40" y="40" width="${s}" height="${s}" fill="#c9f3ec" stroke="#111" stroke-width="3"/>
            </svg>`,
            makeQuestion: () => {
              const side = Math.floor(Math.random() * 8) + 3 // 3..10
              const askPerimeter = Math.random() < 0.5
              return askPerimeter
                ? {
                    prompt: `A square tile has each side = ${side} cm. What is its perimeter?`,
                    unit: 'cm',
                    value: 4 * side,
                    placeholder: 'Perimeter',
                    meta: { side },
                  }
                : {
                    prompt: `A square garden has each side = ${side} m. What is its area?`,
                    unit: 'm²',
                    value: side * side,
                    placeholder: 'Area',
                    meta: { side },
                  }
            },
            questionDiagram: (meta) =>
              `<svg viewBox="0 0 200 200" width="220" height="220">
              <rect x="40" y="40" width="120" height="120" fill="#c9f3ec" stroke="#111" stroke-width="3"/>
              <text x="100" y="110" text-anchor="middle" font-size="16" fill="#111">side = ${meta.side}</text>
            </svg>`,
          },
          {
            key: 'rectangle',
            name: 'Rectangle',
            description:
              'Opposite sides are equal; all angles are right angles.',
            perimeter: 'P = 2 × (length + width)',
            area: 'A = length × width',
            examples: ['Door', 'Notebook cover', 'TV screen'],
            diagram: ({ w = 120, h = 80 } = {}) =>
              `<svg viewBox="0 0 220 160" width="240" height="180">
              <rect x="40" y="40" width="${w}" height="${h}" fill="#d8f8dc" stroke="#111" stroke-width="3"/>
            </svg>`,
            makeQuestion: () => {
              const L = Math.floor(Math.random() * 10) + 6 // 6..15
              const W = Math.floor(Math.random() * 7) + 3 // 3..9
              const askArea = Math.random() < 0.6
              return askArea
                ? {
                    prompt: `A book is ${L} cm long and ${W} cm wide. What is its area?`,
                    unit: 'cm²',
                    value: L * W,
                    placeholder: 'Area',
                    meta: { L, W },
                  }
                : {
                    prompt: `A door is ${L} m tall and ${W} m wide. What is its perimeter?`,
                    unit: 'm',
                    value: 2 * (L + W),
                    placeholder: 'Perimeter',
                    meta: { L, W },
                  }
            },
            questionDiagram: (meta) =>
              `<svg viewBox="0 0 260 200" width="260" height="200">
              <rect x="50" y="40" width="160" height="100" fill="#d8f8dc" stroke="#111" stroke-width="3"/>
              <text x="130" y="30" text-anchor="middle" font-size="14" fill="#111">length = ${meta.L}</text>
              <text x="20" y="95" text-anchor="middle" font-size="14" fill="#111" transform="rotate(-90,20,95)">width = ${meta.W}</text>
            </svg>`,
          },
          {
            key: 'triangle',
            name: 'Right Triangle',
            description:
              'A triangle with one 90° angle. Area uses base and height.',
            perimeter: 'P = a + b + c (sum of all sides)',
            area: 'A = ½ × base × height',
            examples: [
              'Yield road sign (triangular)',
              'Tent flap',
              'Pizza slice',
            ],
            diagram: ({ b = 120, h = 90 } = {}) =>
              `<svg viewBox="0 0 200 160" width="220" height="180">
              <polygon points="40,140 160,140 40,50" fill="#fbe0e6" stroke="#111" stroke-width="3"/>
              <line x1="40" y1="140" x2="40" y2="50" stroke="#111" stroke-width="3"/>
              <rect x="40" y="120" width="20" height="20" fill="none" stroke="#111" stroke-width="2"/>
            </svg>`,
            makeQuestion: () => {
              const base = Math.floor(Math.random() * 8) + 6 // 6..13
              const height = Math.floor(Math.random() * 6) + 4 // 4..9
              return {
                prompt: `A right triangle has base = ${base} cm and height = ${height} cm. What is its area?`,
                unit: 'cm²',
                value: 0.5 * base * height,
                placeholder: 'Area',
                meta: { base, height },
              }
            },
            questionDiagram: (meta) =>
              `<svg viewBox="0 0 220 180" width="240" height="200">
              <polygon points="40,160 180,160 40,60" fill="#fbe0e6" stroke="#111" stroke-width="3"/>
              <text x="110" y="175" text-anchor="middle" font-size="14" fill="#111">base = ${meta.base}</text>
              <text x="30" y="110" text-anchor="middle" font-size="14" fill="#111" transform="rotate(-90,30,110)">height = ${meta.height}</text>
            </svg>`,
          },
          {
            key: 'parallelogram',
            name: 'Parallelogram',
            description:
              'Opposite sides are parallel and equal; slanted rectangle.',
            perimeter: 'P = 2 × (a + b)',
            area: 'A = base × height',
            examples: [
              'Leaning road sign post panel',
              'Slanted picture frame',
              'Certain kites',
            ],
            diagram: ({ b = 120, h = 80 } = {}) =>
              `<svg viewBox="0 0 240 180" width="240" height="180">
              <polygon points="40,120 160,120 200,40 80,40" fill="#f2e9ff" stroke="#111" stroke-width="3"/>
            </svg>`,
            makeQuestion: () => {
              const base = Math.floor(Math.random() * 8) + 6 // 6..13
              const height = Math.floor(Math.random() * 7) + 4 // 4..10
              return {
                prompt: `A billboard panel is a parallelogram with base = ${base} m and height = ${height} m. What is its area?`,
                unit: 'm²',
                value: base * height,
                placeholder: 'Area',
                meta: { base, height },
              }
            },
            questionDiagram: (meta) =>
              `<svg viewBox="0 0 260 200" width="260" height="200">
              <polygon points="60,140 200,140 240,60 100,60" fill="#f2e9ff" stroke="#111" stroke-width="3"/>
              <text x="150" y="160" text-anchor="middle" font-size="14" fill="#111">base = ${meta.base}</text>
              <text x="50" y="110" text-anchor="middle" font-size="14" fill="#111" transform="rotate(-90,50,110)">height = ${meta.height}</text>
            </svg>`,
          },
          {
            key: 'circle',
            name: 'Circle',
            description:
              'All points are the same distance (radius) from the center.',
            perimeter: 'Circumference = 2 × π × r',
            area: 'A = π × r²',
            examples: ['Clock face', 'Wheel', 'Coin'],
            diagram: ({ r = 60 } = {}) =>
              `<svg viewBox="0 0 200 200" width="220" height="220">
              <circle cx="100" cy="100" r="${r}" fill="#fff8c6" stroke="#111" stroke-width="3"/>
              <line x1="100" y1="100" x2="${100 + r}" y2="100" stroke="#111" stroke-width="2"/>
            </svg>`,
            makeQuestion: () => {
              const r = Math.floor(Math.random() * 6) + 3 // 3..8
              const askArea = Math.random() < 0.6
              if (askArea) {
                const area = Math.round(3.14 * r * r) // nearest whole number
                return {
                  prompt: `A coin has radius r = ${r} cm. Using π ≈ 3.14, what is its area? (round to nearest whole)`,
                  unit: 'cm²',
                  value: area,
                  placeholder: 'Area (rounded)',
                  meta: { r },
                }
              } else {
                const C = Math.round(2 * 3.14 * r) // nearest whole
                return {
                  prompt: `A clock has radius r = ${r} cm. Using π ≈ 3.14, what is its circumference? (round to nearest whole)`,
                  unit: 'cm',
                  value: C,
                  placeholder: 'Circumference (rounded)',
                  meta: { r },
                }
              }
            },
            questionDiagram: (meta) =>
              `<svg viewBox="0 0 240 220" width="240" height="220">
              <circle cx="120" cy="110" r="70" fill="#fff8c6" stroke="#111" stroke-width="3"/>
              <line x1="120" y1="110" x2="${120 + 70}" y2="110" stroke="#111" stroke-width="2"/>
              <text x="120" y="105" text-anchor="middle" font-size="14" fill="#111">r = ${meta.r}</text>
            </svg>`,
          },
        ],
      }
    },
    computed: {
      shape() {
        return this.shapes[this.index]
      },
      shapeDiagram() {
        // Base teaching diagram (not scaled by random meta)
        return this.shape.diagram()
      },
      questionDiagram() {
        // For question, render with the same numbers used in the prompt
        if (this.shape.questionDiagram && this.question.meta) {
          return this.shape.questionDiagram(this.question.meta)
        }
        return this.shape.diagram()
      },
    },
    methods: {
      goToQuestion() {
        this.feedback = ''
        this.isCorrect = false
        this.answer = ''
        this.question = this.shape.makeQuestion()
        this.step = 'question'
      },
      tryAnother() {
        // New randomized question for the same shape
        this.feedback = ''
        this.isCorrect = false
        this.answer = ''
        this.question = this.shape.makeQuestion()
      },
      checkAnswer() {
        if (this.answer === '' || this.answer === null) return

        const user = parseFloat(this.answer)
        const correct = parseFloat(this.question.value)

        // Allow small rounding tolerance for non-integers
        const within = Math.abs(user - correct) <= 0.5

        if (within) {
          this.isCorrect = true
          this.feedback = '🎉 Correct! Great job!'
        } else {
          this.isCorrect = false
          this.feedback = `❌ Not quite. Hint: review the formula above and check your units.`
        }
      },
      nextShape() {
        this.index++
        this.answer = ''
        this.feedback = ''
        this.isCorrect = false

        if (this.index >= this.shapes.length) {
          this.step = 'done'
        } else {
          this.step = 'teach'
        }
      },
      restart() {
        this.index = 0
        this.step = 'teach'
        this.answer = ''
        this.feedback = ''
        this.isCorrect = false
      },
    },
  }
</script>

<style scoped>
  .geometry-explorer {
    max-width: 720px;
    margin: 0 auto;
    padding: 16px;
    color: #173f3a;
  }

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  .card {
    background: #ffffff;
    border: 1px solid #cfeee7;
    border-radius: 14px;
    box-shadow: 0 6px 18px rgba(11, 187, 152, 0.08);
    padding: 16px;
  }

  .diagram {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 12px 0 8px;
  }

  .explain .what {
    margin: 8px 0;
  }

  .formulas p {
    margin: 4px 0;
  }

  .examples ul {
    margin: 6px 0 0 18px;
  }

  .answer-row {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0 0;
  }

  .answer-input {
    width: 180px;
    padding: 8px 10px;
    border: 1px solid #84e0cf;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
  }

  .answer-input:focus {
    border-color: #0bbb98;
    box-shadow: 0 0 0 3px rgba(11, 187, 152, 0.15);
  }

  .unit {
    font-weight: 600;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .btn {
    border: 1px solid #0bbb98;
    background: #fff;
    color: #0bbb98;
    padding: 8px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
    transition:
      background 0.2s,
      color 0.2s,
      transform 0.06s;
  }
  .btn:hover {
    background: #06977a;
    color: #fff;
  }
  .btn:active {
    transform: scale(0.98);
  }

  .btn.primary {
    background: #0bbb98;
    color: #fff;
  }
  .btn.primary:hover {
    background: #06977a;
  }

  .btn.ghost {
    background: #fff;
    color: #0bbb98;
  }

  .feedback {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  .feedback.ok {
    color: #1f8f4e;
  }
  .feedback.bad {
    color: #b32b2b;
  }

  .next-wrap {
    margin-top: 12px;
    text-align: center;
  }
</style>
