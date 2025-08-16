<template>
  <li>
    <div class="item-label" @click="handleClick">
      {{ item.label }}
      <span v-if="hasChildren">{{ expanded ? '▼' : '▶' }}</span>
    </div>
    <ul v-if="hasChildren && expanded" class="submenu">
      <NavbarItem
        v-for="(child, idx) in item.children"
        :key="idx"
        :item="child"
        :collapsed="collapsed"
        @itemClick="$emit('itemClick', $event)"
      />
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'NavbarItem',
    props: {
      item: { type: Object, required: true },
      collapsed: { type: Boolean, default: false },
    },
    data() {
      return { expanded: false }
    },
    computed: {
      hasChildren() {
        return this.item.children && this.item.children.length > 0
      },
    },
    methods: {
      handleClick() {
        if (this.hasChildren) {
          this.expanded = !this.expanded
        }
        this.$emit('itemClick', this.item)
      },
    },
  }
</script>

<style scoped>
  .item-label {
    cursor: pointer;
    padding: 8px;
    font-size: 16px;
    transition: background 0.2s;
  }

  .item-label:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .submenu {
    list-style: none;
    padding-left: 15px;
  }
</style>
