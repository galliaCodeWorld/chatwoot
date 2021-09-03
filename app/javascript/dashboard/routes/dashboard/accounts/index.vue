<template>
  <div class="accounts-page row">
    <div class="left-wrap" :class="wrapClass">
      <AccountsHeader />
      <AccountsTable :accounts="accountState.accounts" :query="accountState.query" :editID="accountState.editID"/>
    </div>
    <AccountsEditPan v-if="showEditPan" />
    <EditAccount :show="accountState.editing" />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import store from 'dashboard/store';
  import AccountsHeader from './components/AccountHeader.vue';
  import AccountsTable from './components/AccountTable.vue';
  import AccountsEditPan from './components/AccountEditPannel.vue';
  import EditAccount from './components/info/EditAccount.vue'

  export default {
    name: 'entity-accounts',
    components: {
      AccountsHeader,
      AccountsTable,
      AccountsEditPan,
      EditAccount,
    },
    computed: {
      ...mapGetters({
        accountState: 'enAccounts/getState'
      }),
      wrapClass() {
        return this.accountState.editID === -1 ? 'medium-12' : 'medium-9';
      },
      showEditPan() {
        return this.accountState.editID !== -1 && this.accountState.editID !== 'new';
      },
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('enAccounts/search').then(() => {
        next()
      })
    },
  };
</script>
<style lang="scss" scoped>
  .accounts-page {
    width: 100%;
  }
  .left-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .strip {
    height: 25px;
    width: auto;
    background: #dcdcdc;
    color: black;
    float: left;
    font-size: 11px;
    margin: 0px 6px 0px 0px;
    padding: 1px 4px 1px 3px;
    text-align: right;
    width: 75px;
    -moz-border-radius-topleft: 7px;
    -moz-border-radius-bottomleft: 7px;
    -webkit-border-top-left-radius: 7px;
    -webkit-border-bottom-left-radius: 7px;
  }
</style>
