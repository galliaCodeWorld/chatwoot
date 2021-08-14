<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form ref="lead_person_form"
    @submit.prevent="handleSubmit(submit)">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="first_name"
            rules="required|min:3"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">First name:</label>
              <md-input name='first_name' v-model="leadState.lead.first_name" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="last_name"
            rules="required|min:3"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Last name:</label>
              <md-input name='last_name' v-model="leadState.lead.last_name" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Email:</label>
              <md-input name='email' v-model="leadState.lead.email" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="phone"
            rules="required|min:5|max:20"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Phone:</label>
              <md-input name='phone' v-model="leadState.lead.phone" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
      </div>
      <div class="md-layout">
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="tags"
            rules="required"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
              <multiselect name="tags" v-model="leadState.lead.tags"
                placeholder="Tags.."
                label="name" track-by="id"
                :multiple="true" :taggable="true"
                :options="adTagState.tags"
              />
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <md-button type="submit" class="md-success md-raised md-dense">
            person
          </md-button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { extend, Validator } from "vee-validate";
  import { required, email, min, max } from "vee-validate/dist/rules";
  extend("required", required);
  extend("email", email);
  extend("min", min);
  extend('max', max);
  export default {
    name: 'leads-lists-person',
    data() {
      return {
        sending: false,
      }
    },
    computed: {
      ...mapGetters({
        leadState: 'enLeads/getState',
        adTagState: 'adTags/getState'
      })
    },
    methods: {
      submit() {
        alert('person submit...')
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>
