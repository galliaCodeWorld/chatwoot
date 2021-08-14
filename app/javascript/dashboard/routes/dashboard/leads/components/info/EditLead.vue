<template>
  <woot-modal :show.sync="show" :on-close="onCancel" modal-type="right-aligned">
    <div class="column content-box">
      <woot-modal-header
        :header-title="leadState.lead.id !== 'new' ? 'Edit Lead' : 'Create Lead'"
      />
      <EditDetails />
    </div>
  </woot-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import EditDetails from './lists';

export default {
  name: 'edit-lead',
  /////////////////////////////// test git desktop ------------------------------------------------------
  components: {
    EditDetails,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      leadState: 'enLeads/getState',
    }),
  },
  methods: {
    onCancel() {
      let org = this.leadState.leads.find(k => k.id === this.leadState.lead.id)
      if (org)
        Promise.all([
          this.$store.dispatch('enLeads/editing', false),
          this.$store.dispatch('enLeads/lead', org),
          this.$store.dispatch('enLeads/editID', this.leadState.lead.id)
        ])
      else
        Promise.all([
          this.$store.dispatch('enLeads/editing', false),
          this.$store.dispatch('enLeads/lead', {}),
          this.$store.dispatch('enLeads/editID', -1)
        ])
    },
    async onSubmit(params) {
      console.log('submit...', params)
    },
  },
};
</script>
