<template>
  <md-checkbox v-model="check" class="md-info" @change="checked">
    <div class="strip" style="width: 100px;" :style="style">
      <strong v-html="params.value" />
    </div>
  </md-checkbox>
</template>
<script>
  import { mapState, mapGetters } from 'vuex';
  import Vue from 'vue';
  export default Vue.extend({
    name: 'lead-status-render',
    data: () => {
      return {
        check: false
      }
    },
    computed: {
      ...mapState({
        wEditID: state => state.enLeads.editID
      }),
      ...mapGetters({
        leadState: 'enLeads/getState'
      }),
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
    watch: {
      wEditID(newValue, oldValue) {
        this.check = this.params.data.id === newValue
      }
    },
    mounted() {
      this.check = this.params.data.id === leadState.editID
    },
    methods: {
      checked(checked) {
        if (checked && this.params.data.id !== this.leadState.editID) {
          this.$store.dispatch('enLeads/show', this.params.data.id).then(res => {
            Promise.all([
              res
              ? this.$store.dispatch('enLeads/editID', res.id)
              : this.$store.dispatch('enLeads/editID', -1),
              this.$store.dispatch('enLeads/editing', false)
            ])
          })
        }
      }
    },
  })
</script>
<style lang="scss" scoped>
  @import "dashboard/assets/scss/md/checkboxes";
</style>
<style lang="scss">
</style>
