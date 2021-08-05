<template>
  <div id="app" class="app-wrapper app-root">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { accountIdFromPathname } from 'helper/URLHelper';

export default {
  name: 'App',

  computed: {
    ...mapGetters({
      getAccount: 'accounts/getAccount',
    }),
  },

  mounted() {
    this.$store.dispatch('setUser');
    this.setLocale(window.chatwootConfig.selectedLocale);
    this.initializeAccount();
  },

  methods: {
    setLocale(locale) {
      this.$root.$i18n.locale = locale;
    },

    async initializeAccount() {
      const { pathname } = window.location;
      const accountId = accountIdFromPathname(pathname);

      if (accountId) {
        await this.$store.dispatch('accounts/get');
        const { locale } = this.getAccount(accountId);
        this.setLocale(locale);
      }
    },
  },
};
</script>

<style lang="scss">
  @import '../assets/scss/app';
</style>