<template>
  <div class="prime-game">
    <h2>Prime Numbers Game</h2>
    <p>Select all the prime numbers from the list below:</p>

    <div class="numbers-grid">
      <button
        v-for="(num, index) in numbers"
        :key="index"
        :class="{ selected: selectedNumbers.includes(num) }"
        @click="toggleNumber(num)"
      >
        {{ num }}
      </button>
    </div>

    <div class="actions">
      <button @click="checkAnswer">Check Answer</button>
      <button @click="resetGame">Reset</button>
    </div>

    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: 'PrimeNumbersGame',
    data() {
      return {
        numbers: [],
        selectedNumbers: [],
        message: '',
        primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
      }
    },
    created() {
      this.generateNumbers()
    },
    methods: {
      toggleNumber(num) {
        if (this.selectedNumbers.includes(num)) {
          this.selectedNumbers = this.selectedNumbers.filter((n) => n !== num)
        } else {
          this.selectedNumbers.push(num)
        }
      },
      checkAnswer() {
        const correct =
          this.selectedNumbers.every((n) => this.primes.includes(n)) &&
          this.numbers
            .filter((n) => this.primes.includes(n))
            .every((p) => this.selectedNumbers.includes(p))
        this.message = correct
          ? '🎉 Correct! Well done!'
          : '❌ Some numbers are wrong. Try again.'
      },
      resetGame() {
        this.selectedNumbers = []
        this.message = ''
        this.generateNumbers()
      },
      generateNumbers() {
        const min = 2
        const max = 30
        const allNumbers = []
        while (allNumbers.length < 12) {
          const num = Math.floor(Math.random() * (max - min + 1)) + min
          if (!allNumbers.includes(num)) allNumbers.push(num)
        }
        this.numbers = allNumbers
      },
    },
  }
</script>

<style scoped>
  .prime-game {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .numbers-grid {
    display: grid;
    grid-template-columns: repeat(6, 50px);
    gap: 10px;
    margin: 20px 0;
  }

  .numbers-grid button {
    padding: 10px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #6fd2be;
    background-color: #fff;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .numbers-grid button.selected {
    background-color: #6fd2be;
    color: white;
  }

  .numbers-grid button:hover {
    background-color: #06977a;
    color: white;
  }

  .actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
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
