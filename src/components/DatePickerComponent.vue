<template>
  <div class="date-picker-wrapper" :style="{ width: width + 'px' }">
    <label v-if="label" :for="id" class="date-label">{{ label }}</label>

    <div class="date-input-container" :style="inputStyle">
      <input
        v-if="!range"
        :id="id"
        type="date"
        :value="modelValue"
        :placeholder="placeholder"
        @input="updateValue($event.target.value)"
        :style="{
          color: color,
          fontSize: fontSize + 'px',
          height: height + 'px',
        }"
      />

      <div v-else class="range-wrapper">
        <input
          type="date"
          :value="rangeStart"
          @input="updateRange('start', $event.target.value)"
          :style="{
            color: color,
            fontSize: fontSize + 'px',
            height: height + 'px',
          }"
        />
        <span class="range-separator">to</span>
        <input
          type="date"
          :value="rangeEnd"
          @input="updateRange('end', $event.target.value)"
          :style="{
            color: color,
            fontSize: fontSize + 'px',
            height: height + 'px',
          }"
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
      color: { type: String, default: '#000' },
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
    computed: {
      inputStyle() {
        return {
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }
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
  }

  .range-wrapper {
    display: flex;
    align-items: center;
  }

  .range-separator {
    margin: 0 5px;
    font-weight: bold;
  }
</style>
