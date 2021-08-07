<template>
  <div>
    <EditTags :tags="tagState.tags"/>
    <md-card class="admin-dashbord-tags">
      <md-card-header>
        <div class="d-flex justify-content-between align-baseline">
          <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Tags</p>
          <md-button class="md-default" @click="showModal">create tag</md-button>
        </div>
      </md-card-header>
      <md-card-content>
        <div v-for="(tag,n) in tagState.tags" :key="'ts-'+n" class="tag-info">
          <DetailTags :tag="tag"/>
          <md-divider class="md-hr md-theme-demo-light" />
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../../store'
import DetailTags from './detail.vue';
import EditTags from './edit.vue';

export default {
  name: 'ad-tags',
  components: {
    EditTags,
    DetailTags,
  },
  props: {
    contactId: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      tagState: 'adTags/getState',
    }),
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch('adTags/get'),
      store.dispatch('adGlobal/viewSearch', false),
    ]).then(() => {
      console.log('test api...', store)
      next();
    });
  },
  methods: {
    showModal() {
      this.$store.dispatch('adTags/editID', null)
    }
  },
};
</script>

<style lang="scss">
.admin-dashbord-tags {
  .md-card .md-card-header {
    padding: 0 12px;
  }
  p {
    margin-bottom: 0;
  }
}
</style>
