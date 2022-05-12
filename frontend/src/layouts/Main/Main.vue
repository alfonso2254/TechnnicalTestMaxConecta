<template> 
  <div class="min-h-screen backgroundColor">
    <Nabvar/>
    <div>
        <router-view />
    </div>
  </div>
</template>


<script>
import Nabvar from "../Nabvar/Nabvar.vue";
export default {
  components: {
    Nabvar,
  },
};
</script>