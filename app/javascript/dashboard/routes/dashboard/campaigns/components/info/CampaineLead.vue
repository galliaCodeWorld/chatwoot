<template>
  <woot-modal :show.sync="show" :on-close="onCancel" modal-type="right-aligned">
    <div class="column content-box">
      <woot-modal-header>
        <md-button class="md-primary md-raised md-dense"
        :disabled="sending"
        @click="readySubmit">
          {{campaineState.campaine.id !== 'new' ? 'Edit Campaine' : 'Create Campaine'}}
        </md-button>
      </woot-modal-header>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <EditDetails :sending="sending" @onSubmit="onSubmit"/>
    </div>
  </woot-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import EditDetails from './lists';

export default {
  name: 'edit-campaine',
  components: {
    EditDetails,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sending: false,
    }
  },
  computed: {
    ...mapGetters({
      campaineState: 'enCampaines/getState',
    }),
  },
  methods: {
    onCancel() {
      let org = this.campaineState.campaines.find(k => k.id === this.campaineState.campaine.id)
      if (org)
        Promise.all([
          this.$store.dispatch('enCampaines/editing', false),
          this.$store.dispatch('enCampaines/campaine', org),
          this.$store.dispatch('enCampaines/editID', this.campaineState.campaine.id)
        ])
      else
        Promise.all([
          this.$store.dispatch('enCampaines/editing', false),
          this.$store.dispatch('enCampaines/campaine', {}),
          this.$store.dispatch('enCampaines/editID', -1)
        ])
    },
    readySubmit() {
      this.sending = true
      setTimeout(() => {
        this.sending = false
      }, 100)
    },
    async onSubmit(valid) {
      if (valid) {
        console.log('final...', this.campaineState.campaine)
      }
    }
  },
};
</script>
