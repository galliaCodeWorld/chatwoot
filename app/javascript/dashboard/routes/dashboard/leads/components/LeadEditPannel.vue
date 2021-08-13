<template>
  <div class="medium-3 bg-white leads-edit-pannel">
    <md-button class="md-icon-button md-raised md-dense" @click="onClose">
      <i class="ion-android-close close-icon" />
    </md-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'Vuex';
export default {
  name: 'leads-edit-pannel',
  components: {
  },
  computed: {
    ...mapGetters({
      leadState: 'enLeads/getState'
    })
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .contact--profile {
    padding-bottom: var(--space-slab);
    margin-bottom: var(--space-normal);
  }
}
.leads-edit-pannel {
  height: 100%;
  background: white;
  font-size: var(--font-size-small);
  overflow-y: auto;
  overflow: auto;
  position: relative;
  border-left: 1px solid var(--color-border);
  padding: var(--space-medium) var(--space-two);

  .contact-labels {
    padding-bottom: var(--space-normal);
  }
}

.close-button {
  position: absolute;
  right: var(--space-normal);
  top: var(--space-slab);
  font-size: var(--font-size-big);
  color: var(--color-heading);

  .close-icon {
    margin-right: var(--space-smaller);
  }
}

.conversation--details {
  padding: 0 var(--space-normal);
}

.contact--mute {
  color: var(--r-400);
  display: block;
  text-align: left;
}

.contact--actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
