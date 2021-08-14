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
            <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Title:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
              <md-input name='title' v-model="leadState.lead.title" type="text" />
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="company"
            rules="max:30"
            v-slot="{ passed, failed }"
          >
            <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Company:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
              <md-input name='company' v-model="leadState.lead.company" type="text" />
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
            <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Alt Email:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
              <md-input name='alt_email' v-model="leadState.lead.alt_email" type="text" />
            </md-field>
          </ValidationProvider>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <ValidationProvider
            name="mobile"
            rules="max:30"
            v-slot="{ passed, failed }"
          >
            <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label class="field--label">Mobile:</label>
              <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
              <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
              <md-input name='mobile' v-model="leadState.lead.mobile" type="text" />
            </md-field>
          </ValidationProvider>
        </div>
      </div>
      <div class="md-layout">
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
      </div>
      <md-divider class="md-hr md-theme-demo-light" />
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
          <div class="md-layout">
            <ValidationProvider
              name="street_1"
              rules="max:30"
              v-slot="{ passed, failed }"
            >
              <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
                <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
                <md-input name='street_1' placeholder="Street 1.."
                  v-model="leadState.lead.street_1" type="text" />
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout">
            <ValidationProvider
              name="street_2"
              rules="max:30"
              v-slot="{ passed, failed }"
            >
              <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
                <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
                <md-input name='street_2' placeholder="Street 2.."
                  v-model="leadState.lead.street_2" type="text" />
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
                <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
                  <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
                  <md-input name='city' placeholder="City.."
                    v-model="leadState.lead.city" type="text" />
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
              <ValidationProvider
                name="state"
                rules="max:30"
                v-slot="{ passed, failed }"
              >
                <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
                  <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
                  <md-input name='state' placeholder="State.."
                    v-model="leadState.lead.state" type="text" />
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
                <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
                  <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
                  <md-input name='zip' placeholder="Zip Code.."
                    v-model="leadState.lead.zip" type="text" />
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
              <md-field class="field">
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
              <md-field class="field" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <b-icon class="field--icon" icon="x-circle" scale="1" variant="danger" v-show="failed" />
                <b-icon class="field--icon" icon="check-square" scale="1" variant="success" v-show="passed" />
                <md-input name='referred_by' placeholder="Referred by"
                  v-model="leadState.lead.referred_by" type="text" />
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
  };
</script>
<style lang="scss" scoped>
  .field {
    margin: 0;
    &--icon {
      margin-top: 10px;
    }
    &--label {
      padding-left: 20px;
    }
  }
</style>
