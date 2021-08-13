<template>
  <div class="lead-info">
    <DetailsLead :lead="leadState.lead" />
    <br />
    <b-button-group>
      <b-button pill variant="outline-primary" style="margin-right: 7px;" @click="edit">
        <b-icon icon="pen-fill" variant="primary" />
        Edit
      </b-button>
      <b-button pill variant="outline-danger" @click="del">
        <b-icon icon="trash-fill" variant="danger" />
        Delete
      </b-button>
    </b-button-group>
    <br />
    <b-button-group class="mt-2">
      <b-button pill variant="outline-info" style="margin-right: 7px;" @click="convert">
        <b-iconstack scale="1">
          <b-icon icon="arrow-repeat" shift-h="-4" variant="primary" />
          <b-icon icon="arrow-repeat" shift-h="0" variant="success" />
          <b-icon icon="arrow-repeat" shift-h="4" variant="danger" />
        </b-iconstack>
        Convert
      </b-button>
      <b-button pill variant="outline-secondary" @click="reject">
        <b-iconstack scale="1" rotate="90">
          <b-icon stacked icon="chevron-right" shift-h="-4" variant="danger" />
          <b-icon stacked icon="chevron-right" shift-h="0" variant="success" />
          <b-icon stacked icon="chevron-right" shift-h="4" variant="primary" />
        </b-iconstack>
        Reject
      </b-button>
    </b-button-group>
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
    edit() {
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
    },
    del() {

    },
    convert() {

    },
    reject() {

    },
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
