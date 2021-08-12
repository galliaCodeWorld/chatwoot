<template>
  <div class="strip" style="width: 100px;" :style="style">
    <strong v-html="params.value" />
  </div>
</template>
<script>
  import Vue from 'vue';
  export default Vue.extend({
    name: 'lead-table-status-render',
    computed: {
      style() {
        let style = ''
        switch(this.params.value) {
          case 'rejected':
            style = 'background: OrangeRed;'
          case 'new':
            style = 'background: Silver;'
          case 'converted':
            style = 'background: Turquoise'
          case 'contacted':
            style = 'background: Lime;'
        }
        return style
      }
    },
  })
</script>
