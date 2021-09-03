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
    name: 'account-status-render',
    data: () => {
      return {
        check: false
      }
    },
    computed: {
      ...mapState({
        wEditID: state => state.enAccounts.editID
      }),
      ...mapGetters({
        accountState: 'enAccounts/getState'
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
      this.check = this.params.data.id === this.accountState.editID
    },
    methods: {
      checked(checked) {
        if (checked && this.params.data.id !== this.accountState.editID) 
          this.$store.dispatch('enAccounts/show', this.params.data.id).then(res => {
            Promise.all([
              this.$store.dispatch('enAccounts/editing', false),
              res
              ? this.$store.dispatch('enAccounts/editID', res.id)
              : this.$store.dispatch('enAccounts/editID', -1)
            ])
          })
        else if (!checked) 
          Promise.all([
            this.$store.dispatch('enAccounts/editing', false),
            this.$store.dispatch('enAccounts/editID', -1),
            this.$store.dispatch('enAccounts/account', {})
          ])
      }
    },
  });
</script>
