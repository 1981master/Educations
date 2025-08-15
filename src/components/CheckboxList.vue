<template>
  <div class="checkbox-list">
    <label 
      v-for="(item, index) in data" 
      :key="index" 
      class="checkbox-item"
    >
      <input 
        type="checkbox" 
        :value="item" 
        v-model="selected"
      />
      {{ item }}
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckboxList",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: []
    };
  },
  watch: {
    selected(newVal) {
      this.$emit("update:selected", newVal);
    }
  }
};
</script>

<style scoped>
.checkbox-list {
  display: flex;
  flex-direction: column;
}
.checkbox-item {
  margin-bottom: 6px;
}
</style>
