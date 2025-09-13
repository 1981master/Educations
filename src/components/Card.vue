<template>
  <div
    class="card"
    :class="{
      'card-border': border,
      'card-hover': hoverable,
      'card-clickable': clickable,
    }"
    :style="{ width: width + 'px', height: height + 'px' }"
    @click="handleClick"
  >
    <!-- Header: always rendered, hidden if no title -->
    <div class="card-header" v-show="title">
      {{ title }}
    </div>

    <!-- Body -->
    <div class="card-body" :class="{ 'scrollable-card-content': scrollable }">
      <slot></slot>
    </div>

    <!-- Footer: always rendered, hidden if no footerText -->
    <div class="card-footer" v-show="footerText">
      {{ footerText }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardComponent',
    props: {
      title: { type: String, default: '' },
      footerText: { type: String, default: '' },
      border: { type: Boolean, default: true },
      hoverable: { type: Boolean, default: true },
      clickable: { type: Boolean, default: false },
      width: { type: Number, default: 240 },
      height: { type: Number, default: 300 },
      scrollable: { type: Boolean, default: true },
    },
    methods: {
      handleClick() {
        if (this.clickable) this.$emit('click')
      },
    },
  }
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
  .card-border {
    border: 1px solid #ddd;
  }
  .card-hover:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  .card-clickable {
    cursor: pointer;
  }
  .card-header {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    color: white;
    background-color: #0bbb98;
    border-bottom: none;
    padding: 10px;
    border-radius: 6px 6px 0 0;
  }

  .card-body {
    flex: 1;
  }
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
