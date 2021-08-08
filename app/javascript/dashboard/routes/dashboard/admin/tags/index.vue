<template>
  <div>
    <EditTag :tags="tagState.tags"/>
    <md-card class="ad-tags">
      <md-card-header>
        <div class="d-flex justify-content-between align-baseline">
          <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Tags</p>
          <md-button class="md-default md-dense" @click="showModal">create tag</md-button>
        </div>
      </md-card-header>
      <md-card-content>
        <div v-for="(tag,n) in tagState.tags" :key="'ts-'+n" class="tag-info">
          <DetailTag :tag="tag"/>
          <md-divider class="md-hr md-theme-demo-light" />
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../../store'
import EditTag from './edit.vue';
import DetailTag from './detail.vue';

export default {
  name: 'ad-tags',
  components: {
    EditTag,
    DetailTag,
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
