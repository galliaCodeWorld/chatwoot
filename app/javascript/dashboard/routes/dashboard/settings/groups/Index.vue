<template>
  <div class="leads-page row">
    <div class="left-wrap" :class="wrapClas">
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
    component: {
      LeadsHeader,
      LeadsTable,
    },
    computed: {
      ...mapGetters({
        leadState: 'enLeads/getState'
      })
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('adLeads/search')
      .then(() => {
        console.log('test api...', store)
        next()
      })
    },
  };
</script>
<style lang="scss" scoped>
@import "~vue-material/theme/engine";
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
.leads-page {
  width: 100%;
}
.left-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>