<template>
  <div class="medium-3 bg-white accounts-edit-pannel">
    <span class="close-button" @click="onClose">
      <i class="ion-android-close close-icon" />
    </span>
    <AccountInfo />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AccountInfo from './info';
export default {
  name: 'accounts-edit-pannel',
  components: {
    AccountInfo
  },
  computed: {
    ...mapGetters({
      accountState: 'enAccounts/getState'
    })
  },
  methods: {
    onClose() {
      Promise.all([
        this.$store.dispatch('enAccounts/editID', -1),
        this.$store.dispatch('enAccounts/editing', false),
        this.$store.dispatch('enAccounts/account', {})
      ])
    }
  },
};
</script>

<style lang="scss" scoped>
  ::v-deep {
    .account-info {
      padding-bottom: var(--space-slab);
      margin-bottom: var(--space-normal);
    }
  }
  .accounts-edit-pannel {
    height: 100%;
    background: white;
    font-size: var(--font-size-small);
    overflow-y: auto;
    overflow: auto;
    position: relative;
    border-left: 1px solid var(--color-border);
    padding: var(--space-medium) var(--space-two);
  }
</style>
