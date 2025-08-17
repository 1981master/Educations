<template>
  <div class="fraction-pizza-game">
    <h2>🍕 Fraction Pizza Maker 🍕</h2>
    <p>Drag slices into the pizzas and watch them balance!</p>

    <div class="slices-container">
      <div
        v-for="(slice, index) in slices"
        :key="index"
        class="slice"
        :style="{ width: slice.size + 'px', height: slice.size + 'px' }"
        draggable="true"
        @dragstart="dragStart(slice, $event)"
      >
        {{ slice.fraction }}
      </div>
    </div>

    <div class="pizzas-container">
      <div
        v-for="(pizza, index) in pizzas"
        :key="index"
        class="pizza"
        :style="pizzaStyle(pizza)"
        @dragover.prevent
        @drop="dropSlice(index)"
      >
        <div class="pizza-base">
          <span class="pizza-label">Pizza {{ index + 1 }}</span>
        </div>
        <div class="placed-slices">
          <div
            v-for="(slice, sIndex) in pizza.slices"
            :key="sIndex"
            class="slice"
            :style="{ width: slice.size + 'px', height: slice.size + 'px' }"
          >
            {{ slice.fraction }}
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button @click="resetGame">Reset</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FractionPizza',
    data() {
      return {
        slices: [],
        pizzas: [
          { slices: [], tilt: 0, yOffset: 0 },
          { slices: [], tilt: 0, yOffset: 0 },
        ],
        draggedSlice: null,
      }
    },
    mounted() {
      this.generateSlices()
    },
    methods: {
      generateSlices() {
        const fractions = ['1/2', '1/3', '1/4', '1/6', '1/8']
        this.slices = []
        for (let i = 0; i < 12; i++) {
          const fraction =
            fractions[Math.floor(Math.random() * fractions.length)]
          const size = fraction === '1/2' ? 80 : fraction === '1/3' ? 60 : 40
          const weight = fraction === '1/2' ? 2 : fraction === '1/3' ? 1.5 : 1
          this.slices.push({ fraction, size, weight })
        }
      },
      dragStart(slice, event) {
        this.draggedSlice = slice
      },
      dropSlice(pizzaIndex) {
        if (this.draggedSlice) {
          this.pizzas[pizzaIndex].slices.push(this.draggedSlice)
          this.calculateBalance()
          this.draggedSlice = null
        }
      },
      calculateBalance() {
        const totalWeights = this.pizzas.map((p) =>
          p.slices.reduce((sum, s) => sum + s.weight, 0),
        )
        const maxWeight = Math.max(...totalWeights)
        const minWeight = Math.min(...totalWeights)

        this.pizzas.forEach((pizza, index) => {
          // yOffset: heavier pizza goes lower
          pizza.yOffset =
            (50 * (totalWeights[index] - minWeight)) / (maxWeight || 1)
          // tilt: small tilt toward heavier side
          const diff = totalWeights[1 - index] - totalWeights[index]
          pizza.tilt = Math.min(Math.max(diff * 5, -10), 10)
        })
      },
      pizzaStyle(pizza) {
        return {
          transform: `translateY(${pizza.yOffset}px) rotate(${pizza.tilt}deg)`,
          transition: 'transform 0.5s ease',
        }
      },
      resetGame() {
        this.pizzas.forEach(
          (p) => ((p.slices = []), (p.tilt = 0), (p.yOffset = 0)),
        )
        this.generateSlices()
      },
    },
  }
</script>

<style scoped>
  .fraction-pizza-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
  }

  .slices-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;
    justify-content: center;
  }

  .slice {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffcc66;
    border-radius: 50%;
    cursor: grab;
    font-weight: bold;
    user-select: none;
  }

  .pizzas-container {
    display: flex;
    gap: 50px;
    margin: 20px 0;
    height: 300px;
    position: relative;
  }

  .pizza {
    width: 200px;
    height: 200px;
    border: 2px dashed #ff9900;
    border-radius: 50%;
    position: relative;
  }

  .pizza-base {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #ff6600;
  }

  .placed-slices {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .actions {
    margin-top: 20px;
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
</style>
