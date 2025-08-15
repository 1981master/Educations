<template>
  <hr
    :style="{
      borderColor: color,
      borderStyle: style,
      borderWidth: thickness + 'px',
      margin: margin,
      width: orientation === 'vertical' ? '1px' : width,
      height: orientation === 'vertical' ? height : '1px',
      display: orientation === 'vertical' ? 'inline-block' : 'block',
    }"
  />
</template>

<script>
  export default {
    name: 'DividerComponent',
    props: {
      color: {
        type: String,
        default: '#d9d9d9',
      },
      thickness: {
        type: Number,
        default: 1,
      },
      style: {
        type: String,
        default: 'solid', // solid, dashed, dotted
      },
      margin: {
        type: String,
        default: '10px 0',
      },
      orientation: {
        type: String,
        default: 'horizontal', // horizontal or vertical
      },
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '100%',
      },
    },
  }
</script>
