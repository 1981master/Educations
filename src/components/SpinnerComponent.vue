<template>
  <div class="spinner" :style="spinnerStyle"></div>
</template>

<script>
  export default {
    name: 'SpinnerComponent',
    props: {
      size: { type: String, default: '40px' },
      borderWidth: { type: String, default: '4px' },
      color: { type: String, default: '#0bbb98' },
      speed: { type: Number, default: 1 },
      innerColor: { type: String, default: 'transparent' },
    },
    computed: {
      spinnerStyle() {
        return {
          width: this.size,
          height: this.size,
          border: `${this.borderWidth} solid ${this.innerColor}`,
          borderTop: `${this.borderWidth} solid ${this.color}`,
          borderRadius: '50%',
          animation: `spin ${this.speed}s linear infinite`,
        }
      },
    },
  }
</script>

<style scoped>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
