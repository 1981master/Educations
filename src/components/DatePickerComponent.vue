<template>
  <div class="date-picker-wrapper" :style="{ width: width + 'px' }">
    <label v-if="label" :for="id" class="date-label">{{ label }}</label>

    <div class="date-input-container">
      <input
        v-if="!range"
        :id="id"
        type="date"
        :value="modelValue"
        :placeholder="placeholder"
        @input="updateValue($event.target.value)"
        class="date-input"
      />

      <div v-else class="range-wrapper">
        <input
          type="date"
          :value="rangeStart"
          @input="updateRange('start', $event.target.value)"
          class="date-input"
        />
        <span class="range-separator">to</span>
        <input
          type="date"
          :value="rangeEnd"
          @input="updateRange('end', $event.target.value)"
          class="date-input"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DatePickerComponent',
    props: {
      modelValue: { type: [String, Array], default: '' }, // string for single, array [start, end] for range
      range: { type: Boolean, default: false },
      placeholder: { type: String, default: 'Select date' },
      label: { type: String, default: '' },
      width: { type: Number, default: 200 },
      height: { type: Number, default: 35 },
      fontSize: { type: Number, default: 14 },
      id: { type: String, default: '' },
    },
    data() {
      return {
        rangeStart:
          this.range && Array.isArray(this.modelValue)
            ? this.modelValue[0]
            : '',
        rangeEnd:
          this.range && Array.isArray(this.modelValue)
            ? this.modelValue[1]
            : '',
      }
    },
    methods: {
      updateValue(val) {
        this.$emit('update:modelValue', val)
      },
      updateRange(which, val) {
        if (which === 'start') this.rangeStart = val
        if (which === 'end') this.rangeEnd = val
        this.$emit('update:modelValue', [this.rangeStart, this.rangeEnd])
      },
    },
  }
</script>

<style scoped>
  .date-picker-wrapper {
    display: flex;
    flex-direction: column;
  }

  .date-label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  /* Input container */
  .date-input-container {
    display: flex;
    flex-direction: column;
  }

  /* Single date or range inputs */
  .date-input {
    padding: 4px 8px;
    font-size: 14px;
    height: 35px;
    border: none;
    border-radius: 6px;
    background-color: #0bbb98; /* Table header color */
    color: white;
    outline: none;
    transition:
      background-color 0.2s,
      box-shadow 0.2s;
  }

  .date-input:hover {
    background-color: #099f80;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .range-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .range-separator {
    font-weight: bold;
    color: #333;
  }
</style>
