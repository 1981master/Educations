<template>
  <div
    v-if="visible"
    class="alert-wrapper"
    :style="{
      backgroundColor: backgroundColor,
      color: textColor,
      border: border,
      borderRadius: borderRadius,
      padding: padding,
      fontSize: fontSize + 'px',
      boxShadow: shadow ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
    }"
  >
    <span>{{ message }}</span>
    <button v-if="closable" class="alert-close" @click="close">&times;</button>
  </div>
</template>

<script>
  export default {
    name: 'AlertComponent',
    props: {
      message: { type: String, required: true },
      backgroundColor: { type: String, default: '#f8d7da' },
      textColor: { type: String, default: '#721c24' },
      border: { type: String, default: '1px solid #f5c6cb' },
      borderRadius: { type: String, default: '6px' },
      padding: { type: String, default: '12px 20px' },
      fontSize: { type: Number, default: 14 },
      shadow: { type: Boolean, default: true },
      closable: { type: Boolean, default: true },
      duration: { type: Number, default: 0 }, // auto dismiss after ms, 0 = no auto close
      visible: { type: Boolean, default: true },
    },
    emits: ['update:visible'],
    mounted() {
      if (this.duration > 0) {
        setTimeout(() => {
          this.close()
        }, this.duration)
      }
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
    },
  }
</script>

<style scoped>
  .alert-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    transition: all 0.3s ease;
  }

  .alert-close {
    background: transparent;
    border: none;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    color: inherit;
    padding: 0;
    margin-left: 10px;
    transition: color 0.2s;
  }

  .alert-close:hover {
    color: #000000;
  }
</style>
