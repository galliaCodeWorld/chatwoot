<template>
  <div class="opportunity-info">
    <DetailsOpportunity :opportunity="opportunityState.opportunity" />
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
    <b-button-group class="mt-2" v-if="opportunityState.opportunity.status !== 'rejected'">
      <b-button pill variant="outline-info" style="margin-right: 7px;"
      @click="changeState('converted')">
        <b-iconstack scale="1">
          <b-icon icon="arrow-repeat" shift-h="-4" variant="primary" />
          <b-icon icon="arrow-repeat" shift-h="0" variant="success" />
          <b-icon icon="arrow-repeat" shift-h="4" variant="danger" />
        </b-iconstack>
        Convert
      </b-button>
      <b-button pill variant="outline-secondary"
      @click="changeState('rejected')">
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
import DetailsOpportunity from './detailsOpportunity.vue';
export default {
  name: 'opportunity-info',
  components: {
    DetailsOpportunity
  },
  computed: {
     ...mapGetters({
      opportunityState: 'enOpportunities/getState'
    }),
  },
  methods: {
    edit() {
      this.$store.dispatch('enOpportunities/show', this.opportunityState.editID).then(res => {
        if (res) this.$store.dispatch('enOpportunities/editing', true)
        else
          Promise.all([
            this.$store.dispatch('enOpportunities/editID', -1),
            this.$store.dispatch('enOpportunities/opportunity', {}),
            this.$store.dispatch('enOpportunities/editing', false),
            this.$store.dispatch('enOpportunities/search', this.opportunityState.query)
          ])
      })
    },
    del() {
      this.$store.dispatch('enOpportunities/delete', this.opportunityState.opportunity.id).then(() => {
        Promise.all([
          this.$store.dispatch('enOpportunities/editID', -1),
          this.$store.dispatch('enOpportunities/opportunity', {}),
          this.$store.dispatch('enOpportunities/editing', false),
          this.$store.dispatch('enOpportunities/search', this.opportunityState.query)
        ])
      })
    },
    changeState(param) {
      if (param === 'rejected')
        this.$store.dispatch('enOpportunities/status', {id: this.opportunityState.opportunity.id, status: param}).then(() => {
          this.$store.dispatch('enOpportunities/search', this.opportunityState.query).then(() => {
            let find = this.opportunityState.opportunities.find(k=> k.id === this.opportunityState.opportunity.id)
            if (find) this.$store.dispatch('enOpportunities/opportunity', find)
            else
              Promise.all([
                this.$store.dispatch('enOpportunities/editID', -1),
                this.$store.dispatch('enOpportunities/opportunity', {}),
                this.$store.dispatch('enOpportunities/editing', false),
              ])
          })
        })
      else if (param === 'converted') {

      }
    },
  },
};
</script>

<style scoped lang="scss">
  .opportunity-info {
    align-items: flex-start;
    margin-bottom: 1.6rem;
    .user-thumbnail-box {
      margin-right: 1.6rem;
    }
    text-align: center;
  }
</style>
