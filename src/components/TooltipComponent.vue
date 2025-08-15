<template>
  <div class="tooltip-wrapper" :data-position="position">
    <slot></slot>
    <div
      class="tooltip-text"
      :style="{
        backgroundColor: backgroundColor,
        color: color,
        padding: padding,
        borderRadius: borderRadius,
        fontSize: fontSize + 'px',
      }"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TooltipComponent',
    props: {
      text: { type: String, required: true },
      backgroundColor: { type: String, default: '#333' },
      color: { type: String, default: '#fff' },
      padding: { type: String, default: '6px 10px' },
      borderRadius: { type: String, default: '4px' },
      fontSize: { type: Number, default: 12 },
      position: {
        type: String,
        default: 'top',
        validator: (val) =>
          [
            'top',
            'bottom',
            'left',
            'right',
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ].includes(val),
      },
    },
  }
</script>

<style scoped>
  .tooltip-wrapper {
    position: relative;
    display: inline-block;
  }

  .tooltip-text {
    visibility: hidden;
    position: absolute;
    white-space: nowrap;
    z-index: 1000;
    transition: opacity 0.2s;
    opacity: 0;
  }

  .tooltip-wrapper:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  /* Top/Bottom/Left/Right */
  .tooltip-wrapper[data-position='top'] .tooltip-text {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-6px);
  }

  .tooltip-wrapper[data-position='bottom'] .tooltip-text {
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(6px);
  }

  .tooltip-wrapper[data-position='left'] .tooltip-text {
    top: 50%;
    right: 100%;
    left: auto;
    transform: translateX(-6px) translateY(-50%);
  }

  .tooltip-wrapper[data-position='right'] .tooltip-text {
    top: 50%;
    left: 100%;
    right: auto;
    transform: translateX(6px) translateY(-50%);
  }

  /* Corner positions */
  .tooltip-wrapper[data-position='top-left'] .tooltip-text {
    bottom: 100%;
    left: 0;
    transform: translateY(-6px);
  }

  .tooltip-wrapper[data-position='top-right'] .tooltip-text {
    bottom: 100%;
    right: 0;
    left: auto;
    transform: translateY(-6px);
  }

  .tooltip-wrapper[data-position='bottom-left'] .tooltip-text {
    top: 100%;
    left: 0;
    transform: translateY(6px);
  }

  .tooltip-wrapper[data-position='bottom-right'] .tooltip-text {
    top: 100%;
    right: 0;
    left: auto;
    transform: translateY(6px);
  }
</style>
