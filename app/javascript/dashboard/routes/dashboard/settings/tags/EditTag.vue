<!-- <template>
  <b-modal id="adTagsEditModal" hide-footer hide-header-close size='lg' @hide="clearForm">
    <template #modal-title>{{id ? 'Edit Tag' : 'Create Tag'}}</template>
    <div class="d-block text-center tag-edit">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="at_form" @submit.prevent="handleSubmit(submit)">
          <div class="md-layout create-field-tag mt-3">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
              <ValidationProvider
                name="name"
                :rules="`required|min:${5 || minlen}`"
                v-slot="{ passed, failed }"
              >
                <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Tag name</label>
                  <md-input v-model="name" type="text" />
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
      minLen: 5,
      id: null,
      name: null,
      sending: false,
    };
  },
  computed: mapState({
    editID: state => state.adTags.editID,
  }),
  watch: {
    editID(newValue, oldValue) {
      if (newValue !== -1) {
        let tag = this.$props.tags.find(k => k.id === newValue)
        if (tag) {
          tag = JSON.parse(JSON.stringify(tag))
          this.id = tag.id
          this.name = tag.name
        } else {
          this.id = null
          this.name = null
        }
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
          let msg = this.id
            ? `Updated a "${this.name}" tag..`
            : `Added a new "${this.name}" tag..`
          this.$bvModal.hide('adTagsEditModal')
          this.$store.dispatch('global/setMsg', msg)
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
</style>
 -->

 <template>
  <modal :show.sync="show" :on-close="onClose">
    <div class="column content-box">
      <woot-modal-header :header-title="pageTitle" />
      <form class="row medium-8" @submit.prevent="editTag()">
        <div class="medium-12 columns">
          <label :class="{ error: $v.tagName.$error }">
            {{ $t('TAG_MGMT.EDIT.FORM.NAME.LABEL') }}
            <input
              v-model.trim="tagName"
              type="text"
              :placeholder="$t('TAG_MGMT.EDIT.FORM.NAME.PLACEHOLDER')"
              @input="$v.tagName.$touch"
            />
          </label>
        </div>

        <div class="medium-12 modal-footer">
          <div class="medium-6 columns">
            <woot-submit-button
              :disabled="$v.tagName.$invalid "
              :button-text="$t('TAG_MGMT.EDIT.FORM.SUBMIT')"
            />
            <button class="button clear" @click.prevent="onClose">
              {{ $t('TAG_MGMT.EDIT.CANCEL_BUTTON_TEXT') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import WootSubmitButton from '../../../../components/buttons/FormSubmitButton';
import Modal from '../../../../components/Modal';
import Auth from '../../../../api/auth';

export default {
  components: {
    WootSubmitButton,
    Modal,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      roles: [
        {
          name: 'administrator',
          label: this.$t('TAG_MGMT.TAG_TYPES.ADMINISTRATOR'),
        }
      ],
      tagName: this.name,
      show: true,
    };
  },
  validations: {
    tagName: {
      required,
      minLength: minLength(1),
    }
  },
  computed: {
    pageTitle() {
      return `${this.$t('TAG_MGMT.EDIT.TITLE')} - ${this.name}`;
    },
    ...mapGetters({
    }),
  },
  methods: {
    showAlert(message) {
      bus.$emit('newToastMessage', message);
    },
    async editTag() {
      try {
        let formData = new FormData()
        formData.append('name', this.tagName)
        await this.$store.dispatch('adTags/update', { id: this.id, formData}).then(() => {
          this.$store.dispatch('adTags/get').then(() => {})
        });;
        this.showAlert(this.$t('TAG_MGMT.EDIT.API.SUCCESS_MESSAGE'));
        this.onClose();
      } catch (error) {
        this.showAlert(this.$t('TAG_MGMT.EDIT.API.ERROR_MESSAGE'));
      }
    },
    async resetPassword() {
      try {
        await Auth.resetPassword(this.tagCredentials);
        this.showAlert(
          this.$t('TAG_MGMT.EDIT.PASSWORD_RESET.ADMIN_SUCCESS_MESSAGE')
        );
      } catch (error) {
        this.showAlert(this.$t('TAG_MGMT.EDIT.PASSWORD_RESET.ERROR_MESSAGE'));
      }
    },
  },
};
</script>
<style type="text/css">
  label > input{
    width: 100%;
  }
</style>
