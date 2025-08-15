<template>
  <button
    :class="['btn', shapeClass, { 'btn-border': border }]"
    :style="buttonStyle"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.stop="handleClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "BtnComponent",
  emits: ["click"], // explicitly declare emitted events
  props: {
    label: { type: String, default: "Button" },
    type: { type: String, default: "primary" }, // primary, secondary, danger
    shape: { type: String, default: "rounded" }, // rounded, square, circle
    border: { type: Boolean, default: true },
    hoverColor: { type: String, default: "" }, // optional hover color
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    shapeClass() {
      switch (this.shape) {
        case "circle": return "btn-circle";
        case "square": return "btn-square";
        default: return "btn-rounded";
      }
    },
    buttonStyle() {
      const baseColors = {
        primary: "#0bbb98",
        secondary: "#ccc",
        danger: "#ff4d4f"
      };
      const defaultHoverColors = {
        primary: "#09a07f",
        secondary: "#bbb",
        danger: "#e03b3f"
      };

      const color = baseColors[this.type] || "#0bbb98";
      const hoverColor = this.hoverColor || defaultHoverColors[this.type] || "#09a07f";

      return {
        backgroundColor: this.hover ? hoverColor : color,
        borderColor: this.border ? color : "transparent",
        color: this.type === "secondary" ? "black" : "white",
        cursor: "pointer",
        transition: "all 0.2s ease",
      };
    }
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event); // single emit per click
    }
  }
};
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  outline: none;
  border-width: 2px;
  border-style: solid;
  transition: all 0.2s ease;
}

/* Shapes */
.btn-rounded { border-radius: 8px; }
.btn-square { border-radius: 0; }
.btn-circle { border-radius: 50px; }

/* Border toggle */
.btn-border { border-style: solid; }
</style>

