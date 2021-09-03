<template>
  <woot-modal :show.sync="show" :on-close="onCancel" modal-type="right-aligned">
    <div class="column content-box">
      <woot-modal-header>
        <md-button class="md-primary md-raised md-dense"
        :disabled="sending"
        @click="readySubmit">
          {{opportunityState.opportunity.id !== 'new' ? 'Edit Opportunity' : 'Create Opportunity'}}
        </md-button>
      </woot-modal-header>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <EditDetails :sending="sending" @onSubmit="onSubmit"/>
    </div>
  </woot-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import EditDetails from './lists';

export default {
  name: 'edit-opportunity',
  components: {
    EditDetails,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sending: false,
    }
  },
  computed: {
    ...mapGetters({
      opportunityState: 'enOpportunities/getState',
    }),
  },
  methods: {
    onCancel() {
      let org = this.opportunityState.opportunities.find(k => k.id === this.opportunityState.opportunity.id)
      if (org)
        Promise.all([
          this.$store.dispatch('enOpportunities/editing', false),
          this.$store.dispatch('enOpportunities/opportunity', org),
          this.$store.dispatch('enOpportunities/editID', this.opportunityState.opportunity.id)
        ])
      else
        Promise.all([
          this.$store.dispatch('enOpportunities/editing', false),
          this.$store.dispatch('enOpportunities/opportunity', {}),
          this.$store.dispatch('enOpportunities/editID', -1)
        ])
    },
    readySubmit() {
      this.sending = true
      setTimeout(() => {
        this.sending = false
      }, 100)
    },
    async onSubmit(valid) {
      if (valid) {
        console.log('final...', this.opportunityState.opportunity)
      }
    }
  },
};
</script>
