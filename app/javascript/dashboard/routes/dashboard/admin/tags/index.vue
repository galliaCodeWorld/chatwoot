<template>
  <div>
    <Edit :tags="tagState.tags"/>
    <md-card class="ad-tags">
      <md-card-header>
        <div class="d-flex justify-content-between align-baseline">
          <strong class="title" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Tags</strong>
          <md-button class="md-default md-raised md-dense" @click="showModal">create tag</md-button>
        </div>
      </md-card-header>
      <md-card-content>
        <div v-for="(tag,n) in tagState.tags" :key="'ts-'+n" class="tag-info">
          <Detail :tag="tag"/>
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
  name: 'ad-tags',
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
      tagState: 'adTags/getState',
    }),
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch('adGlobal/viewSearch', false),
      store.dispatch('adTags/get'),
    ]).then(() => {
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
.ad-tags {
  .md-card .md-card-header {
    padding: 0 12px;
  }
  p {
    margin-bottom: 0;
  }
}
</style>
