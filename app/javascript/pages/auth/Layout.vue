<template>
  <div id="auth_layout" class="app-wrapper app-root">
    <md-toolbar md-elevation="0" class="md-transparent md-toolbar-absolute">
      <div class="md-toolbar-row md-offset">
        <div class="md-toolbar-section-start">
        </div>
        <div class="md-toolbar-section-end">
          <div class="md-collapse">
            <md-list>
              <md-list-item href="auth/pricing">
                <md-icon>attach_money</md-icon>
                Pricing
              </md-list-item>
              <md-list-item href="auth/register">
                <md-icon>person_add</md-icon>
                Register
              </md-list-item>
              <md-list-item href="auth/login">
                <md-icon>fingerprint</md-icon>
                login
              </md-list-item>
              <md-list-item href="auth/lock">
                <md-icon>lock_open</md-icon>
                lock
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </md-toolbar>
    <div class="wrapper wrapper-full-page">
      <div
        class="page-header header-filter"
        :class="setPageClass"
        filter-color="black"
        :style="setBgImage"
      >
        <div class="container md-offset">
          <zoom-center-transition
            :duration="pageTransitionDuration"
            mode="out-in"
          >
            <router-view></router-view>
          </zoom-center-transition>
        </div>
        <footer class="footer">
          <div class="container md-offset">
            <nav>
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    Company
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    Blog
                  </a>
                </li>
              </ul>
            </nav>
            <div class="copyright text-center">
              &copy; {{ new Date().getFullYear() }}
              <a href="javascript:void(0)" target="_blank">Contact Support Team</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { accountIdFromPathname } from 'helper/URLHelper';
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  name: 'auth-layout',

  components: {
    ZoomCenterTransition,
  },
  computed: {
    ...mapGetters({
      getAccount: 'accounts/getAccount',
    }),
    setBgImage() {
      let images = {
        Pricing: "../../assets/imgages/bg-pricing.jpg",
        Login: "../../assets/imgages/login.jpg",
        Register: "../../assets/imgages/register.jpg",
        Lock: "../../assets/imgages/lock.jpg"
      };
      return {
        backgroundImage: `url(${images[this.$route.name]})`
      };
    },
    setPageClass() {
      return `${this.$route.name}-page`.toLowerCase();
    }
  },

  mounted() {
    this.$store.dispatch('setUser');
    this.setLocale(window.chatwootConfig.selectedLocale);
    this.initializeAccount();
  },
  data() {
    return {
      pageTransitionDuration: 300,
    }
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

<style lang="scss" scoped>
</style> 