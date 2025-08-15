<template>
  <div class="select-container" :style="{ width: width + 'px' }">
    <label v-if="label" class="select-label">{{ label }}</label>
    <div class="select-box" @click="toggleDropdown">
      <div class="selected-tags">
        <span v-for="item in selected" :key="item.value" class="tag">
          {{ item.label }}
          <span class="remove-tag" @click.stop="removeItem(item)">×</span>
        </span>
        <span v-if="selected.length === 0" class="placeholder">
          {{ placeholder }}
        </span>
      </div>
      <span class="arrow">{{ showDropdown ? '▲' : '▼' }}</span>
    </div>
    <ul v-show="showDropdown" class="options-list">
      <li
        v-for="option in options"
        :key="option.value"
        :class="{ 'option-selected': isSelected(option) }"
        @click.stop="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SelectComponent',
    props: {
      modelValue: { type: Array, default: () => [] },
      options: { type: Array, required: true },
      multiple: { type: Boolean, default: false },
      placeholder: { type: String, default: 'Select...' },
      width: { type: Number, default: 200 },
      label: { type: String, default: '' },
    },
    data() {
      return {
        selected: this.modelValue,
        showDropdown: false,
      }
    },
    watch: {
      modelValue(newVal) {
        this.selected = newVal
      },
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown
      },
      isSelected(option) {
        return this.selected.findIndex((i) => i.value === option.value) !== -1
      },
      selectOption(option) {
        if (this.multiple) {
          if (this.isSelected(option)) {
            this.selected = this.selected.filter(
              (i) => i.value !== option.value,
            )
          } else {
            this.selected.push(option)
          }
          this.$emit('update:modelValue', [...this.selected])
        } else {
          this.selected = [option]
          this.$emit('update:modelValue', option)
          this.showDropdown = false
        }
      },
      removeItem(item) {
        this.selected = this.selected.filter((i) => i.value !== item.value)
        this.$emit('update:modelValue', [...this.selected])
      },
    },
  }
</script>

<style scoped>
  .select-container {
    position: relative;
    font-family: Arial, sans-serif;
  }

  .select-label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .select-box {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 5px;
    display: flex;
    align-items: center;
    min-height: 36px;
    cursor: pointer;
    justify-content: space-between;
    background: white;
  }

  .selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    flex: 1;
  }

  .tag {
    background-color: #0bbb98;
    color: white;
    border-radius: 4px;
    padding: 2px 6px;
    display: flex;
    align-items: center;
  }

  .remove-tag {
    margin-left: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  .placeholder {
    color: #aaa;
  }

  .arrow {
    margin-left: 8px;
  }

  .options-list {
    position: absolute;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: white;
    margin-top: 2px;
    z-index: 10;
    list-style: none;
    padding: 0;
  }

  .options-list li {
    padding: 6px 10px;
    cursor: pointer;
  }

  .options-list li.option-selected {
    background-color: #0bbb98;
    color: white;
  }

  .options-list li:hover {
    background-color: #09a07f;
    color: white;
  }
</style>
