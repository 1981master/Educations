<template>
  <teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div
        class="modal-container"
        :style="{
          width: width,
          height: height,
          backgroundColor: backgroundColor,
          border: border,
          borderRadius: borderRadius,
          boxShadow: shadow ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
          padding: padding,
        }"
      >
        <!-- Header -->
        <div class="modal-header" v-if="title">
          <span>{{ title }}</span>
          <button class="modal-close" @click="close">
            <!-- Red X icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <slot></slot>
        </div>

        <!-- Footer slot -->
        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
  export default {
    name: 'ModalComponent',
    props: {
      visible: { type: Boolean, default: false },
      title: { type: String, default: '' },
      width: { type: String, default: '500px' },
      height: { type: String, default: '300px' },
      backgroundColor: { type: String, default: '#fff' },
      border: { type: String, default: '1px solid #ccc' },
      borderRadius: { type: String, default: '8px' },
      shadow: { type: Boolean, default: true },
      padding: { type: String, default: '20px' },
    },
    emits: ['update:visible'],
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
    },
  }
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .modal-container {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .modal-close {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .modal-close:hover {
    background-color: rgba(255, 0, 0, 0.1); /* subtle red on hover */
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
  }

  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
