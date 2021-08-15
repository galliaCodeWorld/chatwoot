<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form ref="lead_web_form"
    @submit.prevent="handleSubmit(submit)">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="blog"
            rules="max:80"
            v-slot="{ passed, failed }"
          >
            <md-field style="margin: 0;" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Website/Blog:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
              <md-input name='blog' v-model="leadState.lead.blog" type="text" />
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="twitter"
            rules="max:80"
            v-slot="{ passed, failed }"
          >
            <md-field style="margin: 0;" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Twitter:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <i class="field--icon icon ion-social-twitter" style="color: #1da1f2;" v-show="passed" />
              <md-input name='twitter' v-model="leadState.lead.twitter" type="text" />
            </md-field>
          </ValidationProvider>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="linkedin"
            rules="max:80"
            v-slot="{ passed, failed }"
          >
            <md-field style="margin: 0;" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Linkedin:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <i class="field--icon icon ion-social-linkedin" style="color: #0a66c2;" v-show="passed" />
              <md-input name='linkedin' v-model="leadState.lead.linkedin" type="text" />
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="facebook"
            rules="max:80"
            v-slot="{ passed, failed }"
          >
            <md-field style="margin: 0;" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Facebook:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <i class="field--icon icon ion-social-facebook" style="color: #1877f2;" v-show="passed" />
              <md-input name='facebook' v-model="leadState.lead.facebook" type="text" />
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
            name="skype"
            rules="max:80"
            v-slot="{ passed, failed }"
          >
            <md-field style="margin: 0;" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Skype:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <i class="field--icon icon ion-social-skype" style="color: #00aff0;" v-show="passed" />
              <md-input name='skype' v-model="leadState.lead.skype" type="text" />
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <md-button type="submit" class="md-success md-raised md-dense">
            Web
          </md-button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { extend, Validator } from "vee-validate";
  import { max } from "vee-validate/dist/rules";
  extend('max', max);
  export default {
    name: 'leads-lists-web',
    data() {
      return {
        sending: false
      }
    },
    computed: {
      ...mapGetters({
        leadState: 'enLeads/getState',
      })
    },
    methods: {
      submit() {
        alert('web submit..')
      }
    },
  };
</script>
<style lang="scss" scoped>
  .field {
    margin: 0;
    &--icon {
      margin-top: 5px;
    }
    &--label {
      padding-left: 20px;
    }
  }
</style>
