<template>
  <section>
    <dia/>
  </section>
</template>

<script>
  import dia from './components/dia.vue'
  export default {
    methods:{
      operation: function(){
        console.log('operation tap');
        this.$store.commit('COMMON_OPERATION', 'hello world');
      }
    },
    components: { dia }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>





