<template>
  <div class="account-info">
    <DetailsAccount :account="accountState.account" />
    <br />
    <b-button-group>
      <b-button pill variant="outline-primary" style="margin-right: 7px;" @click="edit">
        <b-icon icon="pen-fill" variant="primary" />
        Edit
      </b-button>
      <b-button pill variant="outline-danger" @click="del">
        <b-icon icon="trash-fill" variant="danger" />
        Delete
      </b-button>
    </b-button-group>
    <br />
    <b-button-group class="mt-2" v-if="accountState.account.status !== 'rejected'">
      <b-button pill variant="outline-info" style="margin-right: 7px;"
      @click="changeState('converted')">
        <b-iconstack scale="1">
          <b-icon icon="arrow-repeat" shift-h="-4" variant="primary" />
          <b-icon icon="arrow-repeat" shift-h="0" variant="success" />
          <b-icon icon="arrow-repeat" shift-h="4" variant="danger" />
        </b-iconstack>
        Convert
      </b-button>
      <b-button pill variant="outline-secondary"
      @click="changeState('rejected')">
        <b-iconstack scale="1" rotate="90">
          <b-icon stacked icon="chevron-right" shift-h="-4" variant="danger" />
          <b-icon stacked icon="chevron-right" shift-h="0" variant="success" />
          <b-icon stacked icon="chevron-right" shift-h="4" variant="primary" />
        </b-iconstack>
        Reject
      </b-button>
    </b-button-group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import DetailsAccount from './detailsAccount.vue';
export default {
  name: 'account-info',
  components: {
    DetailsAccount
  },
  computed: {
     ...mapGetters({
      accountState: 'enAccounts/getState'
    }),
  },
  methods: {
    edit() {
      this.$store.dispatch('enAccounts/show', this.accountState.editID).then(res => {
        if (res) this.$store.dispatch('enAccounts/editing', true)
        else
          Promise.all([
            this.$store.dispatch('enAccounts/editID', -1),
            this.$store.dispatch('enAccounts/account', {}),
            this.$store.dispatch('enAccounts/editing', false),
            this.$store.dispatch('enAccounts/search', this.accountState.query)
          ])
      })
    },
    del() {
      this.$store.dispatch('enAccounts/delete', this.accountState.account.id).then(() => {
        Promise.all([
          this.$store.dispatch('enAccounts/editID', -1),
          this.$store.dispatch('enAccounts/account', {}),
          this.$store.dispatch('enAccounts/editing', false),
          this.$store.dispatch('enAccounts/search', this.accountState.query)
        ])
      })
    },
    changeState(param) {
      if (param === 'rejected')
        this.$store.dispatch('enAccounts/status', {id: this.accountState.account.id, status: param}).then(() => {
          this.$store.dispatch('enAccounts/search', this.accountState.query).then(() => {
            let find = this.accountState.accounts.find(k=> k.id === this.accountState.account.id)
            if (find) this.$store.dispatch('enAccounts/account', find)
            else
              Promise.all([
                this.$store.dispatch('enAccounts/editID', -1),
                this.$store.dispatch('enAccounts/account', {}),
                this.$store.dispatch('enAccounts/editing', false),
              ])
          })
        })
      else if (param === 'converted') {

      }
    },
  },
};
</script>

<style scoped lang="scss">
  .account-info {
    align-items: flex-start;
    margin-bottom: 1.6rem;
    .user-thumbnail-box {
      margin-right: 1.6rem;
    }
    text-align: center;
  }
</style>
