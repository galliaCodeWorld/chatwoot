<template>
  <div>
    <Person />
    <div class="edit-details">
      <div class="list">
        <md-list :md-expand-single="expandSingle">
          <md-list-item md-expand :md-expanded.sync="expandNews">
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
              Comment -> textarea
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
  import Person from './Person.vue';
  import Status from './Status.vue';
  import Contact from './Contact.vue';
  import Web from './Web.vue';
  import Permission from './Permission.vue';
  export default {
    name: 'edit-details',
    components: {
      Person,
      Status,
      Contact,
      Web,
      Permission
    }
  }
</script>
<style lang="scss" scoped>
  .edit-details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
  }

  .list {
    width: inherit;
  }

  .edit-details > .md-list {
    width: inherit;
    max-width: 100%;
    height: 400px;
    display: inline-block;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
    vertical-align: top;
  }
</style>
