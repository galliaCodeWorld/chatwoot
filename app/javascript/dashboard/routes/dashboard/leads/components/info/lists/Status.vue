<template>
    <form ref="lead_status_form"
    @submit.prevent="handleSubmit(submit)">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-33 md-xsmall-size-100 md-size-33">
          <md-field>
            <multiselect v-model="leadState.lead.assigned_to"
              placeholder="Assigned to.."
              label="email" track-by="id"
              :multiple="false" :taggable="true"
              :options="adUserState.users.concat([{email: 'Unassigned'}, {id: 'new', email: 'Myself'}]).map(k => {
                if (!k.id && k.id !== 'new' && k.id === leadState.lead.id) k.email = 'Myself'
                return k
              })"
            />
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-xsmall-size-100 md-size-33">
          <md-field>
            <multiselect v-model="leadState.lead.status"
              placeholder="Status.."
              :multiple="false" :taggable="true"
              :options="status"
            />
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-xsmall-size-100 md-size-33">
          <md-field>
            <multiselect v-model="leadState.lead.rating"
              placeholder="Rating.."
              :multiple="false" :taggable="true"
              :options="rating"
            />
          </md-field>
        </div>
      </div>
      <div class="md-layout">
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-33 md-xsmall-size-100 md-size-33">
          <md-field>
            <multiselect v-model="leadState.lead.source"
              placeholder="Source.."
              :multiple="false" :taggable="true"
              :options="source"
            />
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-xsmall-size-100 md-size-33">
          <md-field>
            <multiselect v-model="leadState.lead.campaign_id"
              placeholder="Campaign.."
              label="name" track-by="id"
              :multiple="false" :taggable="true"
              :options="[]"
            />
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-xsmall-size-100 md-size-33">
          <md-button type="submit" class="md-success md-raised md-dense">
            status
          </md-button>
        </div>
      </div>
    </form>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'leads-lists-status',
    data() {
      return {
        status: [ 'new', 'contacted', 'converted', 'rejected'],
        rating: [0, 1, 2, 3, 4, 5],
        source: [
          {id: 1, title: 'Campaign'},
          {id: 2, title: 'Cold Call'},
          {id: 1, title: 'Online Marketing'},
          {id: 1, title: 'Referral'},
          {id: 1, title: 'Self Generated'},
          {id: 1, title: 'Website'},
          {id: 1, title: 'world of Mouth'},
          {id: 1, title: 'Other'},
        ],
        sending: false,
      }
    },
    computed: {
      ...mapGetters({
        leadState: 'enLeads/getState',
        adUserState: 'adUsers/getState'
      })
    },
    methods: {
      submit() {
        alert('s submit...')
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>
