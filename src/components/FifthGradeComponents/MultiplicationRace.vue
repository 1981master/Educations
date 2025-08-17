<template>
  <div class="multiplication-race">
    <h2>Multiplication Race 🏁</h2>
    <p>Solve the multiplication question to move your car!</p>

    <div class="race-track">
      <div v-for="(track, tIndex) in tracks" :key="tIndex" class="track">
        <div class="track-label">
          {{ track.name }} - {{ track.finished ? 'Finished!' : '' }}
        </div>
        <div class="car" :style="{ left: track.position + '%' }">
          {{ track.emoji }}
        </div>
        <div class="finish-line"></div>
      </div>
    </div>

    <div class="question-area" v-if="!raceFinished">
      <p>Solve: {{ currentQuestion.a }} × {{ currentQuestion.b }} = ?</p>
      <div class="choices">
        <button
          v-for="(option, index) in options"
          :key="index"
          @click="submitAnswer(option)"
        >
          {{ option }}
        </button>
      </div>
      <button @click="resetRace">Reset</button>
    </div>

    <div class="message" v-if="message">{{ message }}</div>

    <div class="leaderboard" v-if="finishedTracks.length">
      <h3>Leaderboard 🏆</h3>
      <ol>
        <li v-for="(track, index) in finishedTracks" :key="index">
          {{ track.name }} - Finished!
        </li>
      </ol>
    </div>

    <audio ref="raceSound" loop>
      <source src="@/assets/carRace.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
  export default {
    name: 'MultiplicationRace',
    data() {
      return {
        tracks: [
          { name: 'Alamin', emoji: '🚗', position: 0, finished: false },
          { name: 'AI 1', emoji: '🤖', position: 0, finished: false, speed: 1 },
          {
            name: 'AI 2',
            emoji: '🤖',
            position: 0,
            finished: false,
            speed: 0.8,
          },
        ],
        currentQuestion: {},
        options: [],
        message: '',
        finishedTracks: [],
        raceFinished: false,
        aiIntervals: [],
      }
    },
    mounted() {
      this.generateQuestion()
      this.startRace()
    },
    beforeUnmount() {
      this.stopAI()
    },
    methods: {
      generateQuestion() {
        const a = Math.floor(Math.random() * 12) + 1
        const b = Math.floor(Math.random() * 12) + 1
        this.currentQuestion = { a, b }
        this.generateOptions(a * b)
        this.message = ''
      },
      generateOptions(correctAnswer) {
        const opts = new Set([correctAnswer])
        while (opts.size < 4) {
          opts.add(Math.floor(Math.random() * 144) + 1)
        }
        this.options = Array.from(opts).sort(() => Math.random() - 0.5)
      },
      submitAnswer(option) {
        if (option === this.currentQuestion.a * this.currentQuestion.b) {
          this.moveCar(0, 10) // Player moves
          this.generateQuestion()
        } else {
          this.message = '❌ Wrong answer!'
        }
        this.checkRaceFinish()
      },
      moveCar(index, distance) {
        if (!this.tracks[index].finished) {
          this.tracks[index].position += distance
          if (this.tracks[index].position >= 100) {
            this.tracks[index].position = 100
            this.tracks[index].finished = true
            this.finishedTracks.push(this.tracks[index])
          }
        }
      },
      startRace() {
        this.$refs.raceSound.play().catch(() => {})
        this.tracks.forEach((track, index) => {
          if (index === 0) return
          const interval = setInterval(() => {
            if (!track.finished) {
              this.moveCar(index, track.speed)
              this.checkRaceFinish()
            } else {
              clearInterval(interval)
            }
          }, 500)
          this.aiIntervals.push(interval)
        })
      },
      stopAI() {
        this.aiIntervals.forEach((i) => clearInterval(i))
        this.aiIntervals = []
        this.$refs.raceSound.pause()
        this.$refs.raceSound.currentTime = 0
      },
      resetRace() {
        this.stopAI()
        this.tracks.forEach((t) => {
          t.position = 0
          t.finished = false
        })
        this.finishedTracks = []
        this.raceFinished = false
        this.message = ''
        this.generateQuestion()
        this.startRace()
      },
      checkRaceFinish() {
        if (this.finishedTracks.length === this.tracks.length) {
          this.raceFinished = true
          this.message = '🏁 Race Finished!'
          this.stopAI()
        }
      },
    },
  }
</script>

<style scoped>
  .multiplication-race {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .race-track {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 80%;
  }

  .track {
    position: relative;
    height: 50px;
    background: #eee;
    border-radius: 8px;
  }

  .track-label {
    position: absolute;
    top: -20px;
    left: 0;
    font-weight: bold;
  }

  .car {
    position: absolute;
    top: 5px;
    width: 40px;
    font-size: 30px;
    transition: left 0.4s;
  }

  .finish-line {
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 100%;
    background: red;
  }

  .question-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .choices {
    display: flex;
    gap: 10px;
  }

  .choices button {
    padding: 6px 12px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #6fd2be;
    transition: 0.2s;
  }

  .choices button:hover {
    background-color: #06977a;
    color: white;
  }

  .message {
    font-weight: bold;
    font-size: 18px;
    color: green;
  }

  .leaderboard {
    margin-top: 15px;
  }
</style>
