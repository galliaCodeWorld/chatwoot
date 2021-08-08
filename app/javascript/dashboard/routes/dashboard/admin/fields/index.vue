<template>
  <div class="md-layout">
    <p>content feilds list .....</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'admin-dashboard-fields',
  components: {
  },
  props: {
    contactId: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      
    };
  },
  computed: {
    // ...mapGetters({
    //   uiFlags: 'contacts/getUIFlags',
    // }),
    // showEmptySearchResult() {
    //   const hasEmptyResults = !!this.searchQuery && this.records.length === 0;
    //   return hasEmptyResults;
    // },
  },
  mounted() {},
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
