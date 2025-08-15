<template>
</template>

<script>
import Card from './Card.vue';
import FirstGrade from './FirstGrade.vue';

export default {
  name: 'GradeFive',
  props: {
    msg: String
  },
  components:{
    FirstGrade,
    Card,
  },
  data(){
    return{
      user:null,
      grade:null,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>