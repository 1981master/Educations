<template>
  <div class="equation-balance">
    <h2>Equation Balance 🏋️‍♂️</h2>
    <p>Balance the scale to match the target sum! 🎯 Target: {{ targetSum }}</p>

    <div class="scale-container">
      <div class="scale" :style="{ transform: scaleTilt }">
        <!-- Left side -->
        <div class="side">
          <div
            v-for="(num, index) in leftNumbers"
            :key="'left-' + index"
            class="number"
            :class="{ selected: selectedLeft.includes(num) }"
            @click="selectNumber('left', num)"
          >
            {{ num.value }}{{ num.weight > 1 ? '×' + num.weight : '' }}
          </div>
        </div>

        <!-- Pivot -->
        <div class="pivot">⚖️</div>

        <!-- Right side -->
        <div class="side">
          <div
            v-for="(num, index) in rightNumbers"
            :key="'right-' + index"
            class="number"
            :class="{ selected: selectedRight.includes(num) }"
            @click="selectNumber('right', num)"
          >
            {{ num.value }}{{ num.weight > 1 ? '×' + num.weight : '' }}
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="checkBalance">Check Balance</button>
      <button @click="resetEquation">Reset</button>
    </div>

    <div v-if="message" class="message">{{ message }}</div>
    <div>Moves: {{ moves }}</div>
  </div>
</template>

<script>
  export default {
    name: 'EquationBalance',
    data() {
      return {
        leftNumbers: [],
        rightNumbers: [],
        selectedLeft: [],
        selectedRight: [],
        message: '',
        moves: 0,
        targetSum: 0,
      }
    },
    created() {
      this.generateEquation()
    },
    computed: {
      leftSum() {
        return this.selectedLeft.reduce((sum, n) => sum + n.value * n.weight, 0)
      },
      rightSum() {
        return this.selectedRight.reduce(
          (sum, n) => sum + n.value * n.weight,
          0,
        )
      },
      scaleTilt() {
        const diff = this.leftSum - this.rightSum
        return `rotate(${Math.max(Math.min(diff * 5, 20), -20)}deg)`
      },
    },
    methods: {
      generateEquation() {
        const randomNumber = () => ({
          value: Math.floor(Math.random() * 9) + 1,
          weight: Math.floor(Math.random() * 3) + 1,
        })

        this.leftNumbers = Array.from({ length: 4 }, randomNumber)
        this.rightNumbers = Array.from({ length: 4 }, randomNumber)

        // Target sum can be random sum from both sides for challenge
        const allNumbers = [...this.leftNumbers, ...this.rightNumbers]
        this.targetSum =
          allNumbers.reduce((sum, n) => sum + n.value * n.weight, 0) -
          Math.floor(Math.random() * 10)

        this.selectedLeft = []
        this.selectedRight = []
        this.message = ''
        this.moves = 0
      },
      selectNumber(side, num) {
        this.moves++
        if (side === 'left') {
          this.selectedLeft.includes(num)
            ? (this.selectedLeft = this.selectedLeft.filter((n) => n !== num))
            : this.selectedLeft.push(num)
        } else {
          this.selectedRight.includes(num)
            ? (this.selectedRight = this.selectedRight.filter((n) => n !== num))
            : this.selectedRight.push(num)
        }
      },
      checkBalance() {
        if (this.leftSum === this.rightSum && this.leftSum === this.targetSum) {
          this.message = '🎉 Perfectly Balanced! Well done!'
        } else {
          this.message = `❌ Not balanced. Left sum: ${this.leftSum}, Right sum: ${this.rightSum}, Target: ${this.targetSum}`
        }
      },
      resetEquation() {
        this.generateEquation()
      },
    },
  }
</script>

<style scoped>
  .equation-balance {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .scale-container {
    margin: 20px 0;
  }

  .scale {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
  }

  .side {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 20px;
  }

  .number {
    width: 60px;
    height: 60px;
    background-color: #6fd2be;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .number.selected {
    background-color: #06977a;
    color: white;
  }

  .pivot {
    font-size: 30px;
  }

  .controls {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }

  .controls button {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #0bbb98;
    background-color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .controls button:hover {
    background-color: #06977a;
    color: white;
  }

  .message {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
