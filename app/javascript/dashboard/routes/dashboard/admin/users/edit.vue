<template>
  <b-modal id="adUsersEditModal" hide-footer hide-header-close size='lg' @hidde="clearForm">
    <template #modal-title>{{user.id ? 'Edit User' : 'Create User'}}</template>
    <div class="d-block text-center user-edit">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="edit_form" @submit.prevent="handleSubmit(submit)">
          <div class="user-info">
            <div class="md-layout auth-info">
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="username"
                  :rules="`required|min:${minlen.name || 3}`"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>User Name</label>
                    <md-input name="username" v-model="user.username" type="text" />
                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Email Adress</label>
                  <md-input name="email" v-model="user.email" type="email" />
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="password"
                  :rules="`required|confirmed:confirmpass|min:${minlen.pass || 6}`"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Password</label>
                  <md-input name="password" v-model="user.password" type="password" />
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  vid="confirmpass"
                  :rules="`required|confirmed:password|min:${minlen.pass || 6}`"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Confirm Password</label>
                  <md-input v-model="confirmpass" type="password" />
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <md-checkbox v-model="user.admin"><a>The user is Administrator.</a></md-checkbox>
            </div>
            <h5 class="title">Personal Information</h5>
            <div class="md-layout pers-info">
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="first_name"
                  :rules="`required|min:${minlen.name || 3}`"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>First Name</label>
                    <md-input name="first_name" v-model="user.first_name" type="text" />
                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="last_name"
                  :rules="`required|min:${minlen.name || 3}`"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>Last Name</label>
                    <md-input name="last_name" v-model="user.last_name" type="text" />
                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="title"
                  :rules="`required|min:${minlen.title || 5}`"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>Title</label>
                    <md-input name="title" v-model="user.title" type="text" />
                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="company"
                  :rules="`required|min:${minlen.title || 5}`"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>Company</label>
                    <md-input name="company" v-model="user.company" type="text" />
                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div> 
            </div>
            <h4 class="title">Group Memberships</h4>
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <multiselect v-model="user.groups" 
                  placeholder="Search group" 
                  label="name" track-by="id" 
                  :options="groups.map((g, i) => {
                    return {id: g.id, name: g.name, created_at: g.created_at, updated_at: g.updated_at}
                  })" 
                  :multiple="true" :taggable="true" 
                />
              </div>
            </div>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <div class="md-layout">
             <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
              <md-button type="submit" class="md-success md-raised md-dense" :disabled="sending"
                v-html="user.id ? 'Update' : 'Create'"
              />
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
              <md-button class="md-danger md-raised md-dense" :disabled="sending" @click="cancel">Cancel</md-button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </b-modal>
</template>
<script>
import { mapState, mapGetters} from 'vuex';
import { extend } from "vee-validate";
import { required, email, confirmed, min } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("confirmed", confirmed);
extend("min", min);

export default {
  name: "ad-users-edit",
  props: {
    groups: {
      type: Array,
      default: () => []
    },
    users: {
      type: Array,
      default: () => []
    }
  },
  computed: mapState({
    editID: state => state.adUsers.editID,
  }),
  watch: {
    editID(newValue, oldValue) {
      if (newValue !== -1) {
        let user = this.users.find(k => k.id === newValue)
        if (user) {
          this.user = JSON.parse(JSON.stringify(user))
          if (!Array.isArray(this.user.groups)) this.user.groups = []
        } else this.user = {groups: []}
        this.confirmpass = null
        this.$bvModal.show('adUsersEditModal');
      }
    }
  },
  data() {
    return {
      minlen: {},
      sending: false,
      user: {groups: []},
      confirmpass: null,
    }
  },
  methods: {
    clearForm() {
      this.$refs.edit_form.reset()
      this.user = {groups: []}
      this.confirmpass = null
      this.sending = false
      this.$store.dispatch('adUsers/editID', -1)
    },
    submit() {
      this.sending = true
      let formData = new FormData()
      formData.append('username', this.user.username)
      formData.append('email', this.user.email)
      formData.append('password', this.user.password)
      formData.append('confirmpass', this.user.confirmpass)
      formData.append('admin', this.user.admin)
      formData.append('first_name', this.user.first_name)
      formData.append('last_name', this.user.last_name)
      formData.append('title', this.user.title)
      formData.append('company', this.user.company)
      // if (Array.isArray(this.user.groups)) {
      //   let tmp = this.groups.map((g, i) => {
      //     return g.id
      //   })
      //   formData.append('groups', tmp)
      // }
      console.log('test ad-users-edit...',this.user)
      this.$store.dispatch('adUsers/update', {id: this.user.id, formData})
      .then(() => {
        Promise.all([
          this.$store.dispatch('adUsers/search'),
          this.$store.dispatch('adGroups/get')
        ]).then(() => {
          this.$bvModal.hide('adUsersEditModal');
        })
      })
    },
    cancel() {
      this.$bvModal.hide('adUsersEditModal');
    }
  }
}
</script>
<style lang="scss">
</style>
