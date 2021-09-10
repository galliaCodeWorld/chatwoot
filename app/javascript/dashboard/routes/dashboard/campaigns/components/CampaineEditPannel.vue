<template>
  <div class="medium-3 bg-white campaines-edit-pannel">
    <span class="close-button" @click="onClose">
      <i class="ion-android-close close-icon" />
    </span>
    <CampaineInfo />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CampaineInfo from './info';
export default {
  name: 'campaines-edit-pannel',
  components: {
    CampaineInfo
  },
  computed: {
    ...mapGetters({
      campaineState: 'enCampaines/getState'
    })
  },
  methods: {
    onClose() {
      Promise.all([
        this.$store.dispatch('enCampaines/editID', -1),
        this.$store.dispatch('enCampaines/editing', false),
        this.$store.dispatch('enCampaines/campaine', {})
      ])
    }
  },
};
</script>

<style lang="scss" scoped>
  ::v-deep {
    .campaine-info {
      padding-bottom: var(--space-slab);
      margin-bottom: var(--space-normal);
    }
  }
  .campaines-edit-pannel {
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
