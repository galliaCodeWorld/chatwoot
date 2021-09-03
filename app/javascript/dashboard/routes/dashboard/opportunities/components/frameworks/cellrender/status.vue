<template>
  <b-form-checkbox v-model="check" name="check-button" switch @change="checked">
    <div class="strip" style="width: 100px;" :style="style">
      <strong v-html="params.value" />
    </div>
  </b-form-checkbox>
</template>
<script>
  import Vue from 'vue';
  import { mapState, mapGetters } from 'vuex';
  export default Vue.extend({
    name: 'opportunity-status-render',
    data: () => {
      return {
        check: false
      }
    },
    computed: {
      ...mapState({
        wEditID: state => state.enOpportunities.editID
      }),
      ...mapGetters({
        opportunityState: 'enOpportunities/getState'
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
      this.check = this.params.data.id === this.opportunityState.editID
    },
    methods: {
      checked(checked) {
        if (checked && this.params.data.id !== this.opportunityState.editID) 
          this.$store.dispatch('enOpportunities/show', this.params.data.id).then(res => {
            Promise.all([
              this.$store.dispatch('enOpportunities/editing', false),
              res
              ? this.$store.dispatch('enOpportunities/editID', res.id)
              : this.$store.dispatch('enOpportunities/editID', -1)
            ])
          })
        else if (!checked) 
          Promise.all([
            this.$store.dispatch('enOpportunities/editing', false),
            this.$store.dispatch('enOpportunities/editID', -1),
            this.$store.dispatch('enOpportunities/opportunity', {})
          ])
      }
    },
  });
</script>
