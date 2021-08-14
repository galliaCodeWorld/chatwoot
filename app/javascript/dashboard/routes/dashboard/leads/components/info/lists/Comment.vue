<template>
  <b-form-textarea
    v-model="leadState.lead.comment"
    placeholder="Enter something..."
    rows="3"
    max-rows="6"
  />
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'leads-lists-comment',
    computed: {
      ...mapGetters({
        leadState: 'enLeads/getState',
      })
    },
  }
</script>
