<template>
  <div
    class="card"
    :class="{ 'card-border': border, 'card-hover': hoverable, 'card-clickable': clickable }"
    :style="{ width: width + 'px', height: height + 'px' }"
    @click="handleClick"
  >
    <!-- Header -->
    <div v-if="header && title" class="card-header">
      {{ title }}
    </div>

    <!-- Body -->
    <div
      class="card-body"
      :class="{ 'scrollable-card-content': scrollable }"
    >
      <slot></slot>
    </div>

    <!-- Footer -->
    <div v-if="footer && footerText" class="card-footer">
      {{ footerText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    title: { type: String, default: "" },
    header: { type: Boolean, default: true },
    footer: { type: Boolean, default: true },
    footerText: { type: String, default: "" },
    border: { type: Boolean, default: true },
    hoverable: { type: Boolean, default: true },
    clickable: { type: Boolean, default: false },
    width: { type: Number, default: 240 },
    height: { type: Number, default: 300 },
    scrollable: { type: Boolean, default: true } // ✅ New toggle for scrolling
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit("click");
      }
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 0;
  padding: 16px;
  border-radius: 10px;
  transition: box-shadow 0.3s ease;
}

/* Optional border */
.card-border {
  border: 1px solid #ddd;
}

/* Hover shadow */
.card-hover:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Clickable cursor */
.card-clickable {
  cursor: pointer;
}

.card-header {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.card-body {
  flex: 1;
}

/* Scrollable only when enabled */
.scrollable-card-content {
  max-height: 100%;
  overflow-y: auto;
}

.card-footer {
  margin-top: 10px;
  font-size: 12px;
  color: gray;
  border-top: 1px solid #eee;
  padding-top: 8px;
}
</style>

