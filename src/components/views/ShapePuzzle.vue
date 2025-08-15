<template>
  <div class="shape-puzzle">
    <h2>Drag the shapes into the correct silhouette!</h2>
    <p>Drag the colored shape into the matching outline</p>

    <div class="puzzle-container">
      <div class="silhouettes">
        <div
          v-for="(sil, index) in silhouettes"
          :key="index"
          class="silhouette"
          :data-shape="sil.name"
          @drop.prevent="onDrop($event, sil.name)"
          @dragover.prevent
        >
          <svg viewBox="-50 -50 100 100" width="80" height="80">
            <polygon
              :points="sil.points"
              stroke="#000"
              fill="transparent"
              stroke-width="3"
            />
          </svg>
        </div>
      </div>

      <div class="draggables">
        <div
          v-for="(shape, index) in draggableShapes"
          :key="index"
          class="draggable"
          :draggable="true"
          @dragstart="onDragStart($event, shape.name)"
        >
          <svg viewBox="-50 -50 100 100" width="80" height="80">
            <polygon
              :points="shape.points"
              fill="#6fd2be"
              stroke="#000"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
    </div>

    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ShapePuzzle',
    data() {
      return {
        draggableShapes: [],
        silhouettes: [],
        draggedShape: null,
        message: '',
        allShapes: [
          { name: 'Triangle', sides: 3 },
          { name: 'Square', sides: 4 },
          { name: 'Pentagon', sides: 5 },
          { name: 'Hexagon', sides: 6 },
        ],
      }
    },
    created() {
      this.generateShapes()
    },
    methods: {
      generateShapes() {
        // create draggable shapes and silhouettes
        this.draggableShapes = this.allShapes.map((s) => ({
          ...s,
          points: this.createPolygonPoints(s),
        }))
        this.silhouettes = this.allShapes.map((s) => ({
          ...s,
          points: this.createPolygonPoints(s),
        }))
      },
      createPolygonPoints(shape) {
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
      onDragStart(event, shapeName) {
        this.draggedShape = shapeName
      },
      onDrop(event, silhouetteName) {
        if (this.draggedShape === silhouetteName) {
          this.message = `🎉 Correct! ${silhouetteName} matched!`
          // remove the matched shape
          this.draggableShapes = this.draggableShapes.filter(
            (s) => s.name !== silhouetteName,
          )
        } else {
          this.message = `❌ Try again!`
        }
        this.draggedShape = null
      },
    },
  }
</script>

<style scoped>
  .shape-puzzle {
    text-align: center;
    margin-top: 20px;
  }
  .puzzle-container {
    display: flex;
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .silhouettes,
  .draggables {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  .silhouette,
  .draggable {
    width: 80px;
    height: 80px;
    cursor: pointer;
    text-align: center;
  }
  .silhouette svg polygon {
    fill: transparent;
  }
  .draggable svg polygon {
    transition: transform 0.2s;
  }
  .draggable svg polygon:hover {
    transform: scale(1.2);
  }
  .message {
    margin-top: 20px;
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>
