<template>
  <div>
    <h2>Welcome, {{ user }}!</h2>
    <p>Select an item from the sidebar to continue.</p>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return { user: 'User' }
    },
  }
</script>
