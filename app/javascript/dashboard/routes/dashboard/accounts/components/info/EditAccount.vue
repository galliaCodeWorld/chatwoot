<template>
  <woot-modal :show.sync="show" :on-close="onCancel" modal-type="right-aligned">
    <div class="column content-box">
      <woot-modal-header>
        <md-button class="md-primary md-raised md-dense"
        :disabled="sending"
        @click="readySubmit">
          {{accountState.account.id !== 'new' ? 'Edit Account' : 'Create Account'}}
        </md-button>
      </woot-modal-header>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <EditDetails :sending="sending" @onSubmit="onSubmit"/>
    </div>
  </woot-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import EditDetails from './lists';

export default {
  name: 'edit-account',
  components: {
    EditDetails,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sending: false,
    }
  },
  computed: {
    ...mapGetters({
      accountState: 'enAccounts/getState',
    }),
  },
  methods: {
    onCancel() {
      let org = this.accountState.accounts.find(k => k.id === this.accountState.account.id)
      if (org)
        Promise.all([
          this.$store.dispatch('enAccounts/editing', false),
          this.$store.dispatch('enAccounts/account', org),
          this.$store.dispatch('enAccounts/editID', this.accountState.account.id)
        ])
      else
        Promise.all([
          this.$store.dispatch('enAccounts/editing', false),
          this.$store.dispatch('enAccounts/account', {}),
          this.$store.dispatch('enAccounts/editID', -1)
        ])
    },
    readySubmit() {
      this.sending = true
      setTimeout(() => {
        this.sending = false
      }, 100)
    },
    async onSubmit(valid) {
      if (valid) {
        console.log('final...', this.accountState.account)
      }
    }
  },
};
</script>
