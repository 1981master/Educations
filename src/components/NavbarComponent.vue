<template>
  <nav :style="navStyle" class="navbar">
    <!-- Top Items -->
    <ul class="navbar-items top-items">
      <li
        v-for="(item, index) in topItems"
        :key="'top-' + index"
        :style="itemStyle"
        @click="$emit('itemClick', item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <!-- Bottom Items -->
    <ul class="navbar-items bottom-items">
      <li
        v-for="(item, index) in bottomItems"
        :key="'bottom-' + index"
        :style="itemStyle"
        @click="$emit('itemClick', item)"
      >
        {{ item.label }}
      </li>
    </ul>

    <!-- Toggle Button -->
    <button class="toggle-btn" @click="toggleNav">
      {{ isCollapsed ? 'Show >>' : 'Hide <<' }}
    </button>
  </nav>
</template>

<script>
  export default {
    name: 'NavbarComponent',
    props: {
      itemsData: { type: Array, default: () => [] },
      treeData: { type: Array, default: () => [] },
      backgroundColor: { type: String, default: '#0bbb98' },
      textColor: { type: String, default: '#fff' },
      hoverColor: { type: String, default: '#06977a' },
      width: { type: String, default: '220px' },
      collapsedWidth: { type: String, default: '50px' },
      itemFontSize: { type: String, default: '16px' },
      padding: { type: String, default: '10px' },
      fontSize: { type: String, default: '16px' },
      iconSize: { type: String, default: '16px' },
    },
    data() {
      return { isCollapsed: false }
    },
    computed: {
      topItems() {
        return this.itemsData.filter((item) => item.position !== 'bottom')
      },
      bottomItems() {
        return this.itemsData.filter((item) => item.position === 'bottom')
      },
      navStyle() {
        return {
          backgroundColor: this.backgroundColor,
          color: this.textColor,
          width: this.isCollapsed ? this.collapsedWidth : this.width,
          height: '100%',
          transition: 'width 0.3s',
          overflow: 'hidden',
          position: 'relative',
          padding: this.padding,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }
      },
      itemStyle() {
        return {
          fontSize: this.itemFontSize,
          cursor: 'pointer',
          padding: '8px',
          transition: 'background 0.2s',
        }
      },
    },
    methods: {
      toggleNav() {
        this.isCollapsed = !this.isCollapsed
      },
    },
  }
</script>

<style scoped>
  .navbar {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .navbar-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tree-container {
    flex: 1;
    overflow: auto;
    margin: 10px 0;
  }

  /* Toggle Button */
  .toggle-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: #fff;
    color: #0bbb98;
    border: 1px solid #0bbb98;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .toggle-btn:hover {
    background: #0bbb98;
    color: #fff;
  }
</style>
