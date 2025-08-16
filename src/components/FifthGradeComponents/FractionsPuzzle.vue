<template>
  <div class="fraction-game">
    <h2>Fractions Puzzle Game</h2>
    <p>Solve the fraction problem:</p>

    <div class="problem">{{ fractionProblem.question }}</div>

    <div class="choices">
      <button
        v-for="(choice, index) in fractionProblem.choices"
        :key="index"
        @click="checkAnswer(choice)"
      >
        {{ choice }}
      </button>
    </div>

    <div class="actions">
      <button @click="generateProblem">Next Problem</button>
    </div>

    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: 'FractionPuzzleGame',
    data() {
      return {
        fractionProblem: {
          question: '',
          answer: '',
          choices: [],
        },
        message: '',
      }
    },
    created() {
      this.generateProblem()
    },
    methods: {
      generateProblem() {
        this.message = ''

        // Generate two random fractions
        const num1 = Math.floor(Math.random() * 9) + 1
        const den1 = Math.floor(Math.random() * 9) + 1
        const num2 = Math.floor(Math.random() * 9) + 1
        const den2 = Math.floor(Math.random() * 9) + 1

        const question = `${num1}/${den1} + ${num2}/${den2}`

        // Calculate correct answer
        const answer = ((num1 * den2 + num2 * den1) / (den1 * den2)).toFixed(2)

        // Generate 3 random wrong choices
        const choices = new Set([answer])
        while (choices.size < 4) {
          const wrong = (Math.random() * 3 + 0.5).toFixed(2)
          choices.add(wrong)
        }

        // Shuffle choices
        this.fractionProblem = {
          question,
          answer,
          choices: Array.from(choices).sort(() => Math.random() - 0.5),
        }
      },
      checkAnswer(choice) {
        this.message =
          choice === this.fractionProblem.answer
            ? '🎉 Correct!'
            : `❌ Wrong! Correct answer is ${this.fractionProblem.answer}`
      },
    },
  }
</script>

<style scoped>
  .fraction-game {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .problem {
    font-size: 24px;
    margin: 20px 0;
    font-weight: bold;
  }

  .choices {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
  }

  .choices button {
    padding: 8px 16px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #6fd2be;
    background-color: #fff;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .choices button:hover {
    background-color: #06977a;
    color: white;
  }

  .actions button {
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #6fd2be;
    background-color: #fff;
    font-weight: bold;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .actions button:hover {
    background-color: #06977a;
    color: white;
  }

  .message {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
