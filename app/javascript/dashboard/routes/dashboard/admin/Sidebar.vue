<template>
  <div class="md-layout mt-3 ad-sidebar">
    <div class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-20 ad-leftdock">
      <md-card v-show="globalState.viewsearch">
        <md-card-header class="text-center">
          <strong class="title" style="color: blue; font-weight: 700; margin-bottom: 0; padding: 10px 0 0 0">Search users</strong>
        </md-card-header>
        <md-card-content>
          <md-autocomplete
            class="search"
            v-model="userState.query"
            :md-options="[]"
            :md-open-on-focus="false"
            @md-changed="searchUsers">
            <label>Search...</label>
          </md-autocomplete>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-medium-size-70 md-xsmall-size-100 md-size-80">
      <zoom-center-transition :duration="10" mode="out-in">
        <router-view />
      </zoom-center-transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { ZoomCenterTransition } from "vue2-transitions";
import {notifyVue} from '../../../helper/notify';

export default {
  name: 'ad-sidebar',
  components: {
    ZoomCenterTransition,
  },
  props: {
    contactId: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: mapState({
    ...mapGetters({
      userState: 'adUsers/getState',
      globalState: 'adGlobal/getState',
    }),
    error: state => state.adGlobal.error,
    msg: state => state.adGlobal.msg,
  }),
  watch: {
    error(newValue, oldValue) {
      if (newValue) notifyVue({ t: 2500, m: newValue, c: 'warning', v: 'top', h: 'left' }, this)
    },
    msg(newValue, oldValue) {
      if (newValue) notifyVue({m: newValue, c: 'success'}, this)
    }
  },
  methods: {
    searchUsers() {
      this.$store.dispatch('adUsers/search', this.userState.query)
    }
  },
};
</script>

<style lang="scss">
.md-button:not(.md-just-icon) .md-button-content i {
  height: -7px;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.ad-sidebar {
  .md-card .md-card-header {
    padding: 0 12px;
  }
  .p {
    margin-bottom: 0;
  }
}
</style> 
