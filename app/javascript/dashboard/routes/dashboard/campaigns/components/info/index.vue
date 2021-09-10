<template>
  <div class="campaine-info">
    <DetailsCampaine :campaine="campaineState.campaine" />
    <br />
    <b-button-group>
      <b-button pill variant="outline-primary" style="margin-right: 7px;" @click="edit">
        <b-icon icon="pen-fill" variant="primary" />
        Edit
      </b-button>
      <b-button pill variant="outline-danger" @click="del">
        <b-icon icon="trash-fill" variant="danger" />
        Delete
      </b-button>
    </b-button-group>
    <br />
    <b-button-group class="mt-2" v-if="campaineState.campaine.status !== 'rejected'">
      <b-button pill variant="outline-info" style="margin-right: 7px;"
      @click="changeState('converted')">
        <b-iconstack scale="1">
          <b-icon icon="arrow-repeat" shift-h="-4" variant="primary" />
          <b-icon icon="arrow-repeat" shift-h="0" variant="success" />
          <b-icon icon="arrow-repeat" shift-h="4" variant="danger" />
        </b-iconstack>
        Convert
      </b-button>
      <b-button pill variant="outline-secondary"
      @click="changeState('rejected')">
        <b-iconstack scale="1" rotate="90">
          <b-icon stacked icon="chevron-right" shift-h="-4" variant="danger" />
          <b-icon stacked icon="chevron-right" shift-h="0" variant="success" />
          <b-icon stacked icon="chevron-right" shift-h="4" variant="primary" />
        </b-iconstack>
        Reject
      </b-button>
    </b-button-group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import DetailsCampaine from './detailsCampaine.vue';
export default {
  name: 'campaine-info',
  components: {
    DetailsCampaine
  },
  computed: {
     ...mapGetters({
      campaineState: 'enCampaines/getState'
    }),
  },
  methods: {
    edit() {
      this.$store.dispatch('enCampaines/show', this.campaineState.editID).then(res => {
        if (res) this.$store.dispatch('enCampaines/editing', true)
        else
          Promise.all([
            this.$store.dispatch('enCampaines/editID', -1),
            this.$store.dispatch('enCampaines/campaine', {}),
            this.$store.dispatch('enCampaines/editing', false),
            this.$store.dispatch('enCampaines/search', this.campaineState.query)
          ])
      })
    },
    del() {
      this.$store.dispatch('enCampaines/delete', this.campaineState.campaine.id).then(() => {
        Promise.all([
          this.$store.dispatch('enCampaines/editID', -1),
          this.$store.dispatch('enCampaines/campaine', {}),
          this.$store.dispatch('enCampaines/editing', false),
          this.$store.dispatch('enCampaines/search', this.campaineState.query)
        ])
      })
    },
    changeState(param) {
      if (param === 'rejected')
        this.$store.dispatch('enCampaines/status', {id: this.campaineState.campaine.id, status: param}).then(() => {
          this.$store.dispatch('enCampaines/search', this.campaineState.query).then(() => {
            let find = this.campaineState.campaines.find(k=> k.id === this.campaineState.campaine.id)
            if (find) this.$store.dispatch('enCampaines/campaine', find)
            else
              Promise.all([
                this.$store.dispatch('enCampaines/editID', -1),
                this.$store.dispatch('enCampaines/campaine', {}),
                this.$store.dispatch('enCampaines/editing', false),
              ])
          })
        })
      else if (param === 'converted') {

      }
    },
  },
};
</script>

<style scoped lang="scss">
  .campaine-info {
    align-items: flex-start;
    margin-bottom: 1.6rem;
    .user-thumbnail-box {
      margin-right: 1.6rem;
    }
    text-align: center;
  }
</style>
