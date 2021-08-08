<template>
  <div>
    <EditGroup :groups="groupState.groups" :users="userState.users"/>
    <md-card class="ad-groups">
      <md-card-header>
        <div class="d-flex justify-content-between align-baseline">
          <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Tags</p>
          <md-button class="md-default md-dense" @click="showModal">create group</md-button>
        </div>
      </md-card-header>
      <md-card-content>
        <div v-for="(group,n) in groupState.groups" :key="'gs-'+n" class="group-info">
          <DetailGroup :group="group"/>
          <md-divider class="md-hr md-theme-demo-light" />
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../../store'
import EditGroup from './edit.vue';
import DetailGroup from './detail.vue';

export default {
  name: 'ad-groups',
  components: {
    EditGroup,
    DetailGroup,
  },
  props: {
    contactId: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      groupState: 'adGroups/getState',
      userState: 'adUsers/getState',
    }),
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch('adUsers/search'),
      store.dispatch('adGroups/get'),
      store.dispatch('adGlobal/viewSearch', false),
    ]).then(() => {
      next();
    });
  },
  methods: {
    showModal() {
      this.$store.dispatch('adGroups/editID', null)
    }
  },
};
</script>

<style lang="scss">
.ad-groups {
  .md-card .md-card-header {
    padding: 0 12px;
  }
  p {
    margin-bottom: 0;
  }
}
</style>
