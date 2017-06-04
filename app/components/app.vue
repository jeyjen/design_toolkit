<template>
 <section>
  <dia/>
 </section>
</template>
<script>
import dia from './dia.vue'
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