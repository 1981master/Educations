<template>
  <span
    class="badge"
    :style="{
      color: textColor,
      backgroundColor: backgroundColor,
      border: border,
      borderRadius: borderRadius,
      padding: padding,
      fontSize: fontSize + 'px',
      boxShadow: shadow ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
      display: 'inline-block',
    }"
  >
    {{ text }}
  </span>
</template>

<script>
  export default {
    name: 'BadgeComponent',
    props: {
      text: { type: String, required: true },
      textColor: { type: String, default: '#fff' },
      backgroundColor: { type: String, default: '#0bbb98' },
      border: { type: String, default: 'none' },
      borderRadius: { type: String, default: '12px' },
      padding: { type: String, default: '6px 12px' },
      fontSize: { type: Number, default: 14 },
      shadow: { type: Boolean, default: false },
    },
  }
</script>

<style scoped>
  .badge {
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    user-select: none;
  }
</style>
