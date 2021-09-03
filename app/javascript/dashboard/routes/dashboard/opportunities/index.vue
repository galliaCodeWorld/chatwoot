<template>
  <div class="opportunities-page row">
    <div class="left-wrap" :class="wrapClass">
      <OpportunitiesHeader />
      <OpportunitiesTable :opportunities="opportunityState.opportunities" :query="opportunityState.query" :editID="opportunityState.editID"/>
    </div>
    <OpportunitiesEditPan v-if="showEditPan" />
    <EditOpportunitie :show="opportunityState.editing" />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import store from 'dashboard/store';
  import OpportunitiesHeader from './components/OpportunitieHeader.vue';
  import OpportunitiesTable from './components/OpportunitieTable.vue';
  import OpportunitiesEditPan from './components/OpportunitieEditPannel.vue';
  import EditOpportunitie from './components/info/EditOpportunitie.vue'

  export default {
    name: 'entity-opportunities',
    components: {
      OpportunitiesHeader,
      OpportunitiesTable,
      OpportunitiesEditPan,
      EditOpportunitie,
    },
    computed: {
      ...mapGetters({
        opportunityState: 'enOpportunities/getState'
      }),
      wrapClass() {
        return this.opportunityState.editID === -1 ? 'medium-12' : 'medium-9';
      },
      showEditPan() {
        return this.opportunityState.editID !== -1 && this.opportunityState.editID !== 'new';
      },
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('enOpportunities/search').then(() => {
        next()
      })
    },
  };
</script>
<style lang="scss" scoped>
  .opportunities-page {
    width: 100%;
  }
  .left-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .strip {
    height: 25px;
    width: auto;
    background: #dcdcdc;
    color: black;
    float: left;
    font-size: 11px;
    margin: 0px 6px 0px 0px;
    padding: 1px 4px 1px 3px;
    text-align: right;
    width: 75px;
    -moz-border-radius-topleft: 7px;
    -moz-border-radius-bottomleft: 7px;
    -webkit-border-top-left-radius: 7px;
    -webkit-border-bottom-left-radius: 7px;
  }
</style>
