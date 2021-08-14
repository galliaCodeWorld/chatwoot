<template>
  <div>
    <Person />
    <div class="edit-details">
      <div class="list">
        <md-list>
          <md-list-item md-expand>
            <span class="md-list-item-text">Status</span>
            <md-list slot="md-expand">
              <Status />
            </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <span class="md-list-item-text">Contact Information</span>
            <md-list slot="md-expand">
              <Contact />
            </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <span class="md-list-item-text">Comment</span>
            <md-list slot="md-expand">
              <Comment />
            </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <span class="md-list-item-text">Web Presence</span>
            <md-list slot="md-expand">
              <Web />
            </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <span class="md-list-item-text">Permission</span>
            <md-list slot="md-expand">
              <Permission />
            </md-list>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>
<script>
  import store from 'dashboard/store';
  import Person from './Person.vue';
  import Status from './Status.vue';
  import Contact from './Contact.vue';
  import Comment from './Comment.vue'
  import Web from './Web.vue';
  import Permission from './Permission.vue';
  export default {
    name: 'edit-details',
    components: {
      Person,
      Status,
      Contact,
      Comment,
      Web,
      Permission
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([
        store.dispatch('adUsers/search'),
        store.dispatch('adGroups/get'),
        store.dispatch('adTags/get'),
      ]).then(() => {
        next()
      })
    },
  };
</script>
<style lang="scss" scoped>
  @import "~dashboard/assets/scss/md/variables";
  @import "~dashboard/assets/scss/md/mixins";
  @import "~dashboard/assets/scss/md/shadows";
  @import "~dashboard/assets/scss/md/colors";
  @import "~dashboard/assets/scss/md/buttons";
  @import "~dashboard/assets/scss/md/autocomplete";
  @import "~dashboard/assets/scss/md/inputs";
  @import "~dashboard/assets/scss/md/inputs-size";
  @import "~dashboard/assets/scss/md/select";

  .list {
    width: inherit;
  }
  .edit-details > .md-list {
    width: inherit;
    max-width: 100%;
    height: 100%;
    display: inline-block;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
    vertical-align: top;
  }
</style>
