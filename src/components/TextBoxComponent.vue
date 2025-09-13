<template>
  <div :class="['textbox-wrapper', labelPositionClass]">
    <!-- Label -->
    <label v-if="label" class="textbox-label">{{ label }}</label>

    <!-- Input -->
    <div class="input-container">
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :maxlength="maxLength"
        :style="{
          width: width + 'px',
          height: height + 'px',
          borderColor: borderColor,
          fontSize: fontSize,
        }"
        :class="[
          'textbox',
          { 'textbox-border': border, 'textbox-date': type === 'date' },
        ]"
        :placeholder="placeholder"
      />
      <!-- Character Counter -->
      <span v-if="showCounter && type === 'text'" class="counter">
        {{ modelValue.length }}/{{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TextBoxComponent',
    props: {
      modelValue: { type: String, default: '' },
      label: { type: String, default: '' },
      labelPosition: { type: String, default: 'top' },
      width: { type: Number, default: 200 },
      height: { type: Number, default: 30 },
      maxLength: { type: Number, default: 50 },
      size: { type: String, default: 'medium' },
      border: { type: Boolean, default: true },
      borderColor: { type: String, default: '#ccc' },
      showCounter: { type: Boolean, default: true },
      placeholder: { type: String, default: '' },
      type: { type: String, default: 'text' },
    },
    computed: {
      fontSize() {
        switch (this.size) {
          case 'small':
            return '12px'
          case 'large':
            return '18px'
          default:
            return '14px'
        }
      },
      labelPositionClass() {
        return this.labelPosition === 'left' ? 'label-left' : 'label-top'
      },
    },
  }
</script>

<style scoped>
  .textbox-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .label-top {
    flex-direction: column;
  }

  .label-left {
    flex-direction: row;
    align-items: center;
  }

  .textbox-label {
    font-weight: bold;
    margin-bottom: 4px;
    margin-right: 8px;
    white-space: nowrap;
  }

  .input-container {
    display: flex;
    flex-direction: column;
  }

  /* Common textbox styling */
  .textbox {
    padding: 4px 8px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    outline: none;
    transition:
      border-color 0.2s,
      background-color 0.2s;
  }

  .textbox-border {
    border-style: solid;
  }

  .textbox:focus {
    border-color: #0bbb98;
  }

  /* Date-specific styling */
  .textbox-date {
    background-color: #0bbb98; /* same as table header */
    color: white;
    border: 1px solid #0bbb98;
    border-radius: 6px;
    padding: 4px 8px;
  }

  .textbox-date::-webkit-calendar-picker-indicator {
    filter: invert(1); /* make icon visible on green background */
  }

  .counter {
    font-size: 12px;
    color: gray;
    margin-top: 2px;
    text-align: right;
  }
</style>
