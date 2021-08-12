<template>
  <div class="leads-page row">
    <div class="left-wrap" :class="wrapClass">
      <LeadsHeader />
      <LeadsTable :leads="leadState.leads" :query="leadState.query" />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import store from '../../../store';
  import LeadsHeader from './components/LeadHeader.vue';
  import LeadsTable from './components/LeadTable.vue';
  
  export default {
    name: 'entity-leads',
    components: {
      LeadsHeader,
      LeadsTable,
    },
    computed: {
      ...mapGetters({
        leadState: 'enLeads/getState'
      }),
      wrapClass() {
        return this.leadState.editID === -1 ? 'medium-12' : 'medium-9';
      }
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('enLeads/search').then(() => {
        next()
      })
    },
  };
</script>
<style lang="scss" scoped>
.leads-page {
  width: 100%;
}
.left-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
