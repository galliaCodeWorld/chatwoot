<template>
  <div>
    <Edit :tags="tagState.tags" :groups="groupState.groups"/>
    <md-card class="ad-users">
      <md-card-header>
        <div class="d-flex justify-content-between align-baseline">
          <strong class="title" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Users</strong>
          <md-button class="md-default md-raised md-dense" @click="showModal">create user</md-button>
        </div>
      </md-card-header>
      <md-card-content>
        <div v-for="(user,n) in userState.users" :key="'us-'+n" class="user-info">
          <Detail :query="userState.query" :user="user"/>
          <md-divider class="md-hr md-theme-demo-light" />
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../../store'
import Edit from './edit.vue';
import Detail from './detail.vue';

export default {
  name: 'ad-users',
  components: {
    Edit,
    Detail,
  },
  props: {
    contactId: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      userState: 'adUsers/getState',
      groupState: 'adGroups/getState',
    }),
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch('adGlobal/viewSearch', true),
      store.dispatch('adUsers/search'),
      store.dispatch('adGroups/get'),
    ]).then(() => {
      next();
    });
  },
  methods: {
    showModal() {
      this.$store.dispatch('adUsers/editID', null)
    }
  },
};
</script>

<style lang="scss">
.ad-users {
  .md-card .md-card-header {
    padding: 0 12px;
  }
  p {
    margin-bottom: 0;
  }
}
</style>
