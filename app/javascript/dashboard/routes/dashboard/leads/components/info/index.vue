<template>
  <div class="lead-info">
    <DetailsLead :lead="leadState.lead" />
    <div class="md-group mr-2">
      <md-button class="md-icon-button md-raised md-dense" @click="showEditModal">
        <i class="md-info icon ion-edit" />
      </md-button>
       <md-button class="md-icon-button md-raised md-dense">
        <i class="md-primary icon ion-eye" />
      </md-button>
       <md-button class="md-icon-button md-raised md-dense">
        <i class="md-warning icon ion-refresh" />
      </md-button>
       <md-button class="md-icon-button md-raised md-dense">
        <i class="md-danger icon ion-android-delete" />
      </md-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import DetailsLead from './detailsLead.vue';
export default {
  name: 'lead-info',
  components: {
    DetailsLead
  },
  computed: {
     ...mapGetters({
      leadState: 'enLeads/getState'
    }),
  },
  methods: {
    showEditModal() {
      this.$store.dispatch('enLeads/show', this.leadState.editID).then(res => {
        if (res)
          Promise.all([
            this.$store.dispatch('enLeads/editID', res.id),
            this.$store.dispatch('enLeads/editing', true)
          ])
        else
          Promise.all([
            this.$store.dispatch('enLeads/editID', -1),
            this.$store.dispatch('enLeads/lead', {}),
            this.$store.dispatch('enLeads/editing', false),
            this.$store.dispatch('enLeads/search', this.leadState.query)
          ])
      })

    }
  },
};
</script>

<style scoped lang="scss">
  @import '~dashboard/assets/scss/md/variables';
  @import '~dashboard/assets/scss/md/mixins';
  @import "~dashboard/assets/scss/md/shadows";
  @import "~dashboard/assets/scss/md/buttons";
  .lead-info {
    align-items: flex-start;
    margin-bottom: 1.6rem;
    .user-thumbnail-box {
      margin-right: 1.6rem;
    }
    text-align: center;
  }
</style>
