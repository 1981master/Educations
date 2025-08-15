<template>
  <div class="slider-wrapper" :style="{ width: width + 'px' }">
    <label v-if="label">{{ label }}: {{ currentValue }}</label>
    <input
      type="range"
      class="slider"
      :min="min"
      :max="max"
      :step="step"
      v-model="currentValue"
      @input="emitValue"
      :style="sliderStyle"
    />
  </div>
</template>

<script>
  export default {
    name: 'SliderComponent',
    props: {
      modelValue: { type: Number, default: 50 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 100 },
      step: { type: Number, default: 1 },
      width: { type: Number, default: 300 },
      label: { type: String, default: '' },
      trackColor: { type: String, default: '#ddd' },
      thumbColor: { type: String, default: '#0bbb98' },
      thumbHoverColor: { type: String, default: '#09a07f' },
      trackHeight: { type: Number, default: 8 },
      thumbSize: { type: Number, default: 20 },
    },
    data() {
      return {
        currentValue: this.modelValue,
      }
    },
    watch: {
      modelValue(val) {
        this.currentValue = val
      },
    },
    computed: {
      sliderStyle() {
        return {
          appearance: 'none',
          WebkitAppearance: 'none',
          width: '100%',
          height: this.trackHeight + 'px',
          background: this.trackColor,
          borderRadius: '8px',
          outline: 'none',
          cursor: 'pointer',
          '--thumb-color': this.thumbColor,
          '--thumb-hover-color': this.thumbHoverColor,
          '--thumb-size': this.thumbSize + 'px',
        }
      },
    },
    methods: {
      emitValue() {
        this.$emit('update:modelValue', this.currentValue)
      },
    },
  }
</script>

<style scoped>
  input.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--thumb-size, 20px);
    height: var(--thumb-size, 20px);
    background: var(--thumb-color, #0bbb98);
    border-radius: 50%;
    border: 2px solid #fff;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    transition:
      background 0.2s,
      transform 0.2s;
  }

  input.slider::-webkit-slider-thumb:hover {
    background: var(--thumb-hover-color, #09a07f);
    transform: scale(1.2);
  }
</style>
