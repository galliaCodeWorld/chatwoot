<template>
  <zoom-center-transition :duration="10" mode="out-in">
    <router-view />
  </zoom-center-transition>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { ZoomCenterTransition } from "vue2-transitions";
import {notifyVue} from '../../../helper/notify';

export default {
  name: 'entity',
  components: {
    ZoomCenterTransition,
  },
  props: {
    contactId: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    ...mapState({
      error: state => state.adGlobal.error,
      msg: state => state.adGlobal.msg,
    }),
  },
  watch: {
    error(newValue, oldValue) {
      if (newValue) notifyVue({ t: 2500, m: newValue, c: 'warning', v: 'top', h: 'left' }, this)
    },
    msg(newValue, oldValue) {
      if (newValue) notifyVue({m: newValue, c: 'success'}, this)
    }
  },
};
</script>

<style lang="scss">
</style>
