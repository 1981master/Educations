<template>
  <div class="accordion">
    <div v-for="panel in panels" :key="panel.key" class="accordion-item">
      <div class="accordion-header" @click="togglePanel(panel.key)">
        {{ panel.header }}
        <span v-if="panel.extra" class="extra">{{ panel.extra }}</span>
      </div>
      <div v-show="activeKeys.includes(panel.key)" class="accordion-content">
        {{ panel.content }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AccordionComponent',
    props: {
      panels: { type: Array, required: true },
      defaultActiveKey: { type: Array, default: () => [] },
      accordion: { type: Boolean, default: false },
      ghost: { type: Boolean, default: false },
    },
    data() {
      return {
        activeKeys: [...this.defaultActiveKey],
      }
    },
    methods: {
      togglePanel(key) {
        if (this.accordion) {
          this.activeKeys = this.activeKeys.includes(key) ? [] : [key]
        } else {
          if (this.activeKeys.includes(key)) {
            this.activeKeys = this.activeKeys.filter((k) => k !== key)
          } else {
            this.activeKeys.push(key)
          }
        }
      },
    },
  }
</script>

<style>
  .accordion {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .accordion-item {
    border-bottom: 1px solid #ddd;
  }
  .accordion-header {
    padding: 10px;
    cursor: pointer;
    background: #f2f2f2;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
  .accordion-header:hover {
    background: #e5e5e5;
  }
  .accordion-content {
    white-space: pre-wrap; /* preserves line breaks */
    word-wrap: break-word; /* wraps long words */
    padding: 10px;
  }
  .extra {
    font-size: 0.9em;
    color: #888;
  }
</style>
