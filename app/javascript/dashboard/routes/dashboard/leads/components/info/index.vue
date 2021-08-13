<template>
  <div class="lead-info">
    <div>{{leadState.lead.email}}</div>
    <div class="md-group">
      <md-button class="md-icon-button md-raised md-dense" @click="showEditModal">
        <i class="icon ion-edit" />
      </md-button>
       <md-button class="md-icon-button md-raised md-dense">
        <i class="icon ion-eye" />
      </md-button>
       <md-button class="md-icon-button md-raised md-dense">
        <i class="icon ion-refresh" />
      </md-button>
       <md-button class="md-icon-button md-raised md-dense">
        <i class="icon ion-android-delete" />
      </md-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'lead-info',
  computed: {
    ...mapGetters({
      leadState: 'enLeads/getState'
    })
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

  .lead-details {
    margin-top: 0.8rem;
    width: 100%;
  }
</style>
