<template>
  <b-modal id="adTagsEditModal" hide-footer hide-header-close size='lg' @hide="clearForm">
    <template #modal-title>{{id ? 'Edit Tag' : 'Create Tag'}}</template>
    <div class="d-block text-center tag-edit">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="at_form" @submit.prevent="handleSubmit(submit)">
          <div class="md-layout create-field-tag mt-3">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
              <ValidationProvider
                name="name"
                rules="required|min:5"
                v-slot="{ passed, failed }"
              >
                <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Tag name</label>
                  <md-input v-model="name" type="text"> </md-input>
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </md-field>
              </ValidationProvider>
            </div>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <md-button type="submit" class="md-success md-raised md-dense" :disabled="sending"
                  v-html="id ? 'Update' : 'Create'" />
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <md-button class="md-danger md-raised md-dense" :disabled="sending" @click="cancel">Cancel</md-button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </b-modal>
</template>

<script>
import { mapState} from 'vuex';
import { extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
extend("required", required);
extend("min", min);

export default {
  name: 'ad-tags-edit',
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: null,
      name: null,
      sending: false,
    };
  },
  mounted() {
    console.log(this.$props.tags)
  },
  computed: mapState({
    editID: state => state.adTags.editID,
  }),
  watch: {
    editID(newValue, oldValue) {
      if (newValue !== -1) {
        let group = this.$props.tags.find(k => k.id === newValue)
        if (group) {
          group = JSON.parse(JSON.stringify(group))
          this.id = group.id
          this.name = group.name
        } else {
          this.id = null
          this.name = null
        }
        console.log('editID watch...', newValue, group)
        this.$bvModal.show('adTagsEditModal');
      }
    },
  },
  methods: {
    clearForm() {
      this.$refs.at_form.reset()
      this.id = null
      this.name = null
      this.sending = false
      this.$store.dispatch('adTags/editID', -1)
    },
    submit() {
      this.sending = true
      let formData = new FormData()
      formData.append('name', this.name)
      this.$store.dispatch('adTags/update', {id: this.id, formData}).then(() => {
        this.$store.dispatch('adTags/get').then(() => {
          let tmp = JSON.stringify(this.name)
          this.$bvModal.hide('adTagsEditModal')
          this.$store.dispatch('adGlobal/setMsg', `Created a new "${tmp} tag.."`)
        })
      })
    },
    cancel() {
      this.$bvModal.hide('adTagsEditModal');
    },
  },
};
</script>

<style lang="scss">
.md-button:not(.md-just-icon) .md-button-content i {
  height: -7px;
}
.admin-dashboard-tags-detail:hover {
  background: #efefef;;
}
.admin-dashboard-tags-detail{
  
  .strip {
    height: 25px;
    width: auto;
    background: #dcdcdc;
    color: black;
    float: left;
    font-size: 11px;
    margin: 0px 6px 0px 0px;
    padding: 1px 4px 1px 3px;
    text-align: right;
    width: 75px;
    -moz-border-radius-topleft: 7px;
    -moz-border-radius-bottomleft: 7px;
    -webkit-border-top-left-radius: 7px;
    -webkit-border-bottom-left-radius: 7px;
  }
}
</style>
