<template>
  <div class="leads-page row">
    <div class="left-wrap" :class="wrapClass">
      <LeadsHeader
        :query="leadState.query"
        :queryHistory="leadState.queryHistory"
      />
      <LeadsTable
        :leads="leadState.leads"
      />
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
      return this.leadState.editID !== -1 ? 'medium-9' : 'medium-12';
    },
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('enLeads/search').then(() => {
        console.log('test api...', store)
        next()
      })
    },
  };
</script>
<style lang="scss">
.leads-page {
  width: 100%;
}
.left-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
