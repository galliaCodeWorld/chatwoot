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
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Website/Blog:</label>
              <md-input name='blog' v-model="leadState.lead.blog" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="twitter"
            rules="max:80"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Twitter:</label>
              <md-input name='twitter' v-model="leadState.lead.twitter" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
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
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Linkedin:</label>
              <md-input name='linkedin' v-model="leadState.lead.linkedin" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="facebook"
            rules="max:80"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Facebook:</label>
              <md-input name='facebook' v-model="leadState.lead.facebook" type="text" />
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
            name="skype"
            rules="max:80"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Skype:</label>
              <md-input name='skype' v-model="leadState.lead.skype" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
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
  }
</script>
<style lang="scss" scoped>

</style>
