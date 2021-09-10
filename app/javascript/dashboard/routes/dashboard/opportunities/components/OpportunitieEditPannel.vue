<template>
  <div class="medium-3 bg-white opportunities-edit-pannel">
    <span class="close-button" @click="onClose">
      <i class="ion-android-close close-icon" />
    </span>
    <OpportunityInfo />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OpportunityInfo from './info';
export default {
  name: 'opportunities-edit-pannel',
  components: {
    OpportunityInfo
  },
  computed: {
    ...mapGetters({
      opportunityState: 'enOpportunities/getState'
    })
  },
  methods: {
    onClose() {
      Promise.all([
        this.$store.dispatch('enOpportunities/editID', -1),
        this.$store.dispatch('enOpportunities/editing', false),
        this.$store.dispatch('enOpportunities/opportunity', {})
      ])
    }
  },
};
</script>

<style lang="scss" scoped>
  ::v-deep {
    .opportunity-info {
      padding-bottom: var(--space-slab);
      margin-bottom: var(--space-normal);
    }
  }
  .opportunities-edit-pannel {
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
