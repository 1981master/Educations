<template>
  <div class="emoji-game">
    <h2>Find the {{ correctEmoji }}!</h2>

    <div class="options">
      <button
        v-for="(emoji, index) in shuffled"
        :key="index"
        @click="checkAnswer(emoji)"
      >
        {{ emoji }}
      </button>
    </div>

    <p class="message">{{ message }}</p>

    <button v-if="correct" class="next-button" @click="nextRound">
      Next Round 🎉
    </button>
  </div>
</template>

<script>
  export default {
    name: 'EmojiGame',
    data() {
      return {
        emojis: [
          '🍌',
          '🍎',
          '🍇',
          '🍉',
          '🍓',
          '🍒',
          '🍑',
          '🥭',
          '🍍',
          '🥝',
          '🍐',
          '🍊',
          '🍋',
          '🍏',
          '🍈',
          '🥥',
          '🥑',
          '🍅',
          '🌽',
          '🥕',
          '🥔',
          '🥦',
          '🍆',
          '🥒',
        ],
        correctEmoji: '🍎',
        message: '',
        correct: false,
        shuffled: [],
        correctSound: null,
        wrongSound: null,
      }
    },
    created() {
      this.shuffleEmojis()

      // initialize sounds
      this.correctSound = new Audio('/correct.mp3')
      this.wrongSound = new Audio('/wrong.mp3')
    },
    methods: {
      shuffleEmojis() {
        this.shuffled = this.emojis.slice().sort(() => Math.random() - 0.5)
      },
      checkAnswer(selected) {
        if (selected === this.correctEmoji) {
          this.message = '🎉 Correct! Great job!'
          this.correct = true
          this.correctSound.play()
        } else {
          this.message = '❌ Try again!'
          this.wrongSound.play()
        }
      },
      nextRound() {
        this.message = ''
        this.correct = false
        const randomIndex = Math.floor(Math.random() * this.emojis.length)
        this.correctEmoji = this.emojis[randomIndex]
        this.shuffleEmojis()
      },
    },
  }
</script>

<style scoped>
  .emoji-game {
    text-align: center;
    margin-top: 30px;
  }

  .options button {
    font-size: 2rem;
    margin: 10px;
    padding: 15px 25px;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    transition: transform 0.2s;
  }

  .options button:hover {
    transform: scale(1.2);
    background-color: #6fd2be;
  }

  .message {
    font-size: 1.5rem;
    margin-top: 20px;
  }

  .next-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1.2rem;
    background-color: #0bbb98;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .next-button:hover {
    transform: scale(1.05);
  }
</style>
