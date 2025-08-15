<template>
  <div
    class="progress-wrapper"
    :style="{
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      height: height,
    }"
  >
    <div class="progress-fill" :style="fillStyle">
      <span
        v-if="showLabel"
        class="progress-label"
        :style="{ color: labelColor }"
      >
        {{ value }}%
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProgressBarComponent',
    props: {
      value: { type: Number, required: true },
      height: { type: String, default: '20px' },
      backgroundColor: { type: String, default: '#e0e0e0' },
      fillColor: { type: String, default: '#0bbb98' },
      borderRadius: { type: String, default: '10px' },
      striped: { type: Boolean, default: false },
      animated: { type: Boolean, default: false },
      showLabel: { type: Boolean, default: true },
      labelColor: { type: String, default: '#fff' },
    },
    computed: {
      fillStyle() {
        let style = {
          width: this.value + '%',
          backgroundColor: this.fillColor,
          height: '100%',
          borderRadius: this.borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.5s ease-in-out',
          overflow: 'hidden',
        }
        if (this.striped) {
          style.backgroundImage =
            'linear-gradient(45deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)'
          style.backgroundSize = '1rem 1rem'
        }
        if (this.animated && this.striped) {
          style.animation = 'progress-stripes 1s linear infinite'
        }
        return style
      },
    },
  }
</script>

<style scoped>
  @keyframes progress-stripes {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 1rem 0;
    }
  }

  .progress-wrapper {
    width: 100%;
    position: relative;
  }

  .progress-label {
    font-weight: bold;
    font-size: 12px;
  }
</style>
