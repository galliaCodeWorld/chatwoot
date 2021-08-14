<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form ref="lead_contact_form"
    @submit.prevent="handleSubmit(submit)">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="title"
            rules="max:30"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Title:</label>
              <md-input name='title' v-model="leadState.lead.title" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="company"
            rules="max:30"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Company:</label>
              <md-input name='company' v-model="leadState.lead.company" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="alt_email"
            rules="max:30"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Alt Email:</label>
              <md-input name='alt_email' v-model="leadState.lead.alt_email" type="text" />
              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="mobile"
            rules="max:30"
            v-slot="{ passed, failed }"
          >
            <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label style="font-weight: 700;">Mobile:</label>
              <md-input name='mobile' v-model="leadState.lead.mobile" type="text" />
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
          <label style="font-weight: 700;">Address:</label>
          <div class="md-layout">
            <ValidationProvider
              name="street_1"
              rules="max:30"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <md-input name='street_1' placeholder="Street 1.."
                  v-model="leadState.lead.street_1" type="text" />
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout">
            <ValidationProvider
              name="street_2"
              rules="max:30"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <md-input name='street_2' placeholder="Street 2.."
                  v-model="leadState.lead.street_2" type="text" />
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
              <ValidationProvider
                name="city"
                rules="max:30"
                v-slot="{ passed, failed }"
              >
                <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <md-input name='city' placeholder="City.."
                    v-model="leadState.lead.city" type="text" />
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
              <ValidationProvider
                name="state"
                rules="max:30"
                v-slot="{ passed, failed }"
              >
                <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <md-input name='state' placeholder="State.."
                    v-model="leadState.lead.state" type="text" />
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </md-field>
              </ValidationProvider>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
              <ValidationProvider
                name="zip"
                rules="max:30"
                v-slot="{ passed, failed }"
              >
                <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <md-input name='zip' placeholder="Zip Code.."
                    v-model="leadState.lead.zip" type="text" />
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
              <md-field>
                <multiselect v-model="leadState.lead.country"
                  placeholder="Country.."
                  :multiple="false" :taggable="true"
                  :options="[]"
                />
              </md-field>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <div class="md-layout">
            <ValidationProvider
              name="referred_by"
              rules="max:30"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <md-input name='referred_by' placeholder="Referred by"
                  v-model="leadState.lead.referred_by" type="text" />
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout">
            <b-form-checkbox v-model="leadState.lead.do_not_call">
              <strong>Do not call</strong>
            </b-form-checkbox>
          </div>
        </div>
      </div>
      <div class="md-layout">
        <md-button type="submit" class="md-success md-raised md-dense">
          contact
        </md-button>
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
    name: 'leads-lists-contact',
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
        alert('contact submit..')
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>
