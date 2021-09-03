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
    name: 'campaine-status-render',
    data: () => {
      return {
        check: false
      }
    },
    computed: {
      ...mapState({
        wEditID: state => state.enCampaines.editID
      }),
      ...mapGetters({
        campaineState: 'enCampaines/getState'
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
      this.check = this.params.data.id === this.campaineState.editID
    },
    methods: {
      checked(checked) {
        if (checked && this.params.data.id !== this.campaineState.editID) 
          this.$store.dispatch('enCampaines/show', this.params.data.id).then(res => {
            Promise.all([
              this.$store.dispatch('enCampaines/editing', false),
              res
              ? this.$store.dispatch('enCampaines/editID', res.id)
              : this.$store.dispatch('enCampaines/editID', -1)
            ])
          })
        else if (!checked) 
          Promise.all([
            this.$store.dispatch('enCampaines/editing', false),
            this.$store.dispatch('enCampaines/editID', -1),
            this.$store.dispatch('enCampaines/campaine', {})
          ])
      }
    },
  });
</script>
