<template>
  <div class="radio-list">
    <label 
      v-for="(item, index) in data" 
      :key="index" 
      class="radio-item"
    >
      <input 
        type="radio" 
        :value="item" 
        v-model="selected"
        name="radio-group"
      />
      <span 
        class="custom-radio" 
        :style="{ borderColor: selected === item ? selectedColor : '#999', backgroundColor: selected === item ? selectedColor : '#fff' }"
      ></span>
      {{ item }}
    </label>
  </div>
</template>

<script>
export default {
  name: "RadioList",
  props: {
    data: {
      type: Array,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: null
    },
    selectedColor: {
      type: String,
      default: "#0bbb98" // default selected color
    }
  },
  data() {
    return {
      selected: this.modelValue
    };
  },
  watch: {
    selected(newVal) {
      this.$emit("update:modelValue", newVal);
    },
    modelValue(newVal) {
      this.selected = newVal;
    }
  }
};
</script>

<style scoped>
.radio-list {
  display: flex;
  flex-direction: column;
}

.radio-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  cursor: pointer;
  position: relative;
}

/* hide default radio */
.radio-item input[type="radio"] {
  display: none;
}

/* custom circle */
.custom-radio {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #999;
  margin-right: 8px;
  display: inline-block;
  transition: all 0.2s ease;
}
</style>

