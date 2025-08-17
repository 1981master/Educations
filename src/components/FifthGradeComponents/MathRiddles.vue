<template>
  <div class="math-riddles p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
    <h2 class="text-2xl font-bold text-purple-700 mb-4">🧩 Math Riddles</h2>

    <div v-if="!showAnswer">
      <p class="text-lg mb-4">{{ currentRiddle.question }}</p>
      <input
        v-model="userAnswer"
        type="text"
        placeholder="Type your answer..."
        class="border rounded px-3 py-2 w-full mb-3"
      />
      <button @click="checkAnswer" class="btn">Submit</button>
    </div>

    <div v-else>
      <p
        class="mb-4 font-semibold"
        :class="isCorrect ? 'text-green-600' : 'text-red-600'"
      >
        {{ feedback }}
      </p>
      <button @click="nextRiddle" class="btn">Next Riddle</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MathRiddles',
    data() {
      return {
        riddles: [
          {
            question:
              'I’m an odd number. Take away one letter and I become even. What number am I?',
            answer: '7',
          },
          {
            question:
              'If you multiply me by any other number, the answer will always remain the same. What number am I?',
            answer: '0',
          },
          {
            question:
              'I am a three-digit number. My tens digit is five more than my ones digit, and my hundreds digit is eight less than my tens digit. What number am I?',
            answer: '194',
          },
          {
            question: 'What has a face and two hands but no arms or legs?',
            answer: 'clock',
          },
        ],
        currentRiddle: {},
        userAnswer: '',
        showAnswer: false,
        isCorrect: false,
        feedback: '',
      }
    },
    created() {
      this.nextRiddle()
    },
    methods: {
      checkAnswer() {
        if (
          this.userAnswer.trim().toLowerCase() ===
          this.currentRiddle.answer.toLowerCase()
        ) {
          this.isCorrect = true
          this.feedback = "🎉 Correct! You're a math wizard!"
        } else {
          this.isCorrect = false
          this.feedback = `❌ Not quite. Hint: Think again! (Answer was "${this.currentRiddle.answer}")`
        }
        this.showAnswer = true
      },
      nextRiddle() {
        this.currentRiddle =
          this.riddles[Math.floor(Math.random() * this.riddles.length)]
        this.userAnswer = ''
        this.showAnswer = false
        this.feedback = ''
      },
    },
  }
</script>

<style scoped>
  .math-riddles {
    background: #fdf6ff;
    border: 2px solid #d8b4fe;
  }
  .btn {
    background: #9333ea;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: bold;
    transition: 0.3s;
  }
  .btn:hover {
    background: #7e22ce;
  }
</style>
