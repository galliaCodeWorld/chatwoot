<template>
  <div class="campaines-page row">
    <div class="left-wrap" :class="wrapClass">
      <CampainesHeader />
      <CampainesTable :campaines="campaineState.campaines" :query="campaineState.query" :editID="campaineState.editID"/>
    </div>
    <CampainesEditPan v-if="showEditPan" />
    <EditCampaine :show="campaineState.editing" />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import store from 'dashboard/store';
  import CampainesHeader from './components/CampaineHeader.vue';
  import CampainesTable from './components/CampaineTable.vue';
  import CampainesEditPan from './components/CampaineEditPannel.vue';
  import EditCampaine from './components/info/EditCampaine.vue'

  export default {
    name: 'entity-campaines',
    components: {
      CampainesHeader,
      CampainesTable,
      CampainesEditPan,
      EditCampaine,
    },
    computed: {
      ...mapGetters({
        campaineState: 'enCampaines/getState'
      }),
      wrapClass() {
        return this.campaineState.editID === -1 ? 'medium-12' : 'medium-9';
      },
      showEditPan() {
        return this.campaineState.editID !== -1 && this.campaineState.editID !== 'new';
      },
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('enCampaines/search').then(() => {
        next()
      })
    },
  };
</script>
<style lang="scss" scoped>
  .campaines-page {
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
