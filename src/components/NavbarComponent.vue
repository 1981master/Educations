<template>
  <nav :style="navStyle" class="navbar">
    <!-- Top Items -->
    <ul class="navbar-items top-items">
      <li
        v-for="(item, index) in topItems"
        :key="'top-' + index"
        class="nav-item"
      >
        <div class="item-label" @click="toggleSubmenu(index, item)">
          {{ item.label }}
          <!-- Arrow for items with children -->
          <span v-if="item.children" class="arrow">
            {{ expandedIndex === index ? '▼' : '▶' }}
          </span>
        </div>

        <!-- Submenu -->
        <ul
          v-if="item.children && expandedIndex === index && !isCollapsed"
          class="submenu"
        >
          <li
            v-for="(child, cIndex) in item.children"
            :key="'child-' + cIndex"
            class="submenu-item"
            @click.stop="$emit('itemClick', child)"
          >
            {{ child.label }}
          </li>
        </ul>
      </li>
    </ul>

    <!-- Bottom Items + Toggle -->
    <div class="bottom-container">
      <ul class="navbar-items bottom-items">
        <li
          v-for="(item, index) in bottomItems"
          :key="'bottom-' + index"
          class="nav-item"
          @click="$emit('itemClick', item)"
        >
          {{ item.label }}
        </li>
      </ul>

      <button class="toggle-btn" @click="toggleNav">
        {{ isCollapsed ? 'Show >>' : 'Hide <<' }}
      </button>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'NavbarComponent',
    props: {
      itemsData: { type: Array, default: () => [] },
      backgroundColor: { type: String, default: '#0bbb98' },
      textColor: { type: String, default: '#fff' },
      hoverColor: { type: String, default: '#06977a' },
      width: { type: String, default: '220px' },
      collapsedWidth: { type: String, default: '60px' },
      itemFontSize: { type: String, default: '16px' },
      padding: { type: String, default: '10px' },
    },
    data() {
      return {
        isCollapsed: false,
        expandedIndex: null,
      }
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          position: 'relative',
          padding: this.padding,
          boxSizing: 'border-box',
        }
      },
    },
    methods: {
      toggleNav() {
        this.isCollapsed = !this.isCollapsed
        if (this.isCollapsed) this.expandedIndex = null
      },
      toggleSubmenu(index, item) {
        if (!item.children) {
          this.$emit('itemClick', item)
          return
        }
        this.expandedIndex = this.expandedIndex === index ? null : index
      },
    },
  }
</script>

<style scoped>
  .navbar {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  /* Top and bottom items container */
  .navbar-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    font-weight: bold;
  }

  /* Main item label container (for arrow + text) */
  .item-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 8px;
    transition: background 0.2s;
  }

  .item-label:hover {
    background-color: #06977a;
    color: white;
  }

  /* Arrow */
  .arrow {
    font-size: 12px;
    margin-left: 5px;
  }

  /* Submenu */
  .submenu {
    list-style: none;
    padding-left: 15px;
    margin-top: 5px;
  }

  .submenu-item {
    padding: 5px 8px;
    font-weight: normal;
    cursor: pointer;
    background: transparent; /* no default background */
    transition: background 0.2s;
  }

  .submenu-item:hover {
    background-color: #04a886; /* highlight only hovered item */
    color: white;
  }

  /* Bottom container ensures logout stays above toggle */
  .bottom-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  /* Toggle Button */
  .toggle-btn {
    background: #fff;
    color: #0bbb98;
    border: 1px solid #0bbb98;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
    margin-top: 5px;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .toggle-btn:hover {
    background: #0bbb98;
    color: #fff;
  }
</style>
