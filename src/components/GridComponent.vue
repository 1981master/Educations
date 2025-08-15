<template>
  <div :class="gridClass" :style="gridStyle">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'GridComponent',
    props: {
      columns: {
        type: [Number, String], // number or responsive string like 'repeat(auto-fit, minmax(200px, 1fr))'
        default: 2,
      },
      gap: {
        type: String, // CSS value like "1rem", "10px"
        default: '1rem',
      },
      align: {
        type: String, // 'start', 'center', 'end', 'stretch'
        default: 'stretch',
      },
      justify: {
        type: String, // 'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'
        default: 'start',
      },
      responsive: {
        type: Boolean, // Enable auto responsive layout
        default: false,
      },
      minColumnWidth: {
        type: String, // For responsive, e.g., "200px"
        default: '200px',
      },
      fullHeight: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      gridClass() {
        return {
          'grid-full-height': this.fullHeight,
        }
      },
      gridStyle() {
        let templateColumns = this.responsive
          ? `repeat(auto-fit, minmax(${this.minColumnWidth}, 1fr))`
          : `repeat(${this.columns}, 1fr)`

        return {
          display: 'grid',
          gridTemplateColumns: templateColumns,
          gap: this.gap,
          alignItems: this.align,
          justifyContent: this.justify,
        }
      },
    },
  }
</script>

<style scoped>
  .grid-full-height {
    height: 100%;
  }
</style>
