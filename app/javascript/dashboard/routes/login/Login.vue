<!-- <template>
  <div class="medium-12 column login">
    <md-card class="login-page md-card-login">
      <md-card-header class="md-card-header-green">
        <div>
          <img
            :src="globalConfig.logo"
            :alt="globalConfig.installationName"
            class="hero__logo"
          />
        </div>
      </md-card-header>
      <md-card-content>
        <ValidationObserver v-slot="{ handleSubmit }" ref="login_form_obs">
          <form ref="login_form" @submit.prevent="handleSubmit(submit)">
            <div class="md-layout create-field-group mt-3">
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{passed, failed}"
                >
                  <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <b-icon :icon="passed? 'person-check-fill' : 'person-fill'" 
                      :variant="passed ? 'success' : 'danger'" scale="3" />
                    <label>{{ $t('LOGIN.EMAIL.LABEL') }}</label>
                    <md-input name="email" v-model="credentials.email" type="email" />
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <ValidationProvider
                  name="password"
                  rules="required|min:3"
                  v-slot="{ passed, failed }"
                >
                  <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <b-icon :icon="passed ? 'unlock-fill' : 'lock-fill'" 
                      :variant="passed ? 'success' : 'danger'" scale="3" />
                    <label>{{ $t('LOGIN.PASSWORD.LABEL') }}</label>
                    <md-input v-model="credentials.password" type="password" />
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" v-if="showForgot()">
                <md-checkbox v-model="forgot" slot="check" @change="forgotPwd">
                  {{ $t('LOGIN.FORGOT_PASSWORD') }}
                </md-checkbox>
              </div>
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-progress-bar md-mode="indeterminate" v-if="sending" />
              </div>
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-button type="submit" class="md-success w-100" :disabled="disabledSubmit()">
                  {{$t('LOGIN.SUBMIT')}}
                </md-button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { extend } from "vee-validate";
import { email, required, min } from "vee-validate/dist/rules";
import Auth from '../../api/auth';

extend("email", email);
extend("required", required);
extend("min", min);


export default {
  props: {
    ssoAuthToken: { type: String, default: null },
    config: { type: String, default: null },
    email: { type: String, default: null },
  },
  data() {
    return {
      forgot: false,
      sending: false,
      credentials: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      globalConfig: 'globalConfig/get',
    }),
  },
  created() {
    if (this.$props.ssoAuthToken) this.credentials.email = JSON.stringify(this.$props.email)
  },
  methods: {
    showAlert(message) {
      this.sending = false
      bus.$emit('newToastMessage', message);
    },
    init() {
      this.forgot = false
      this.sending = false
    },
    disabledSubmit() {
      return !this.sending && this.$refs.login_form_obs?.fields?.email.valid && this.$refs.login_form_obs?.fields?.password.valid ? false : true
    },
    submit() {
      this.sending = true;
      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
        sso_auth_token: this.$props.ssoAuthToken,
      };
      this.$store.dispatch('login', credentials)
        .then(() => {
          this.showAlert(this.$t('LOGIN.API.SUCCESS_MESSAGE'));

        })
        .catch(err => {
          if (err && err.status === 401) {
						const { errors } = err.data;
						const hasAuthErrorMsg = errors && errors.length && errors[0] && typeof errors[0] === 'string';
            if (hasAuthErrorMsg) this.showAlert(errors[0]);
            else this.showAlert(this.$t('LOGIN.API.UNAUTH'));
          } else this.showAlert(this.$t('LOGIN.API.ERROR_MESSAGE'));
        });
    },
    showForgot() {
      let show = this.$refs.login_form_obs?.fields?.email.valid
      if (!show) this.forgot = false;
      return show
    },
    forgotPwd(checked) {
      if (checked && this.$refs.login_form_obs.fields.email.valid) {
        this.sending = true;
        Auth.resetPassword(this.credentials)
        .then(res => {
          let successMessage = this.$t('RESET_PASSWORD.API.SUCCESS_MESSAGE');
          if (res.data && res.data.message) {
            successMessage = res.data.message;
          }
          this.showAlert(successMessage);
          this.forgot = false
        })
        .catch(error => {
          let errorMessage = this.$t('RESET_PASSWORD.API.ERROR_MESSAGE');
          if (error?.response?.data?.message) errorMessage = error.response.data.message;
          this.showAlert(errorMessage);
          this.forgot = false
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
  .md-field label {
    left: 36px;
  }
  .md-field .md-input, .md-field .md-textarea {
    margin-bottom: 0;
    margin-left: 30px;
    padding: 7px;
  }
</style>
 -->

 <template>
  <div class="medium-12 column login">
    <div class="text-center medium-12 login__hero align-self-top">
      <img
        :src="globalConfig.logo"
        :alt="globalConfig.installationName"
        class="hero__logo"
      />
      <h2 class="hero__title">
        {{
          $t('LOGIN.TITLE', { projectName: globalConfig.installationName } )
        }}
      </h2>
    </div>
    <div class="row align-center">
      <div v-if="!email" class="small-12 medium-4 column">
        <form class="login-box column align-self-top" @submit.prevent="login()">
          <div class="column log-in-form">
            <label :class="{ error: $v.credentials.email.$error }">
              {{ $t('LOGIN.EMAIL.LABEL') }}
              <input
                v-model.trim="credentials.email"
                type="text"
                data-testid="email_input"
                :placeholder="$t('LOGIN.EMAIL.PLACEHOLDER')"
                @input="$v.credentials.email.$touch"
              />
            </label>
          </div>
          <div class="column log-in-form">
            <label :class="{ error: $v.credentials.password.$error }">
              {{ $t('LOGIN.PASSWORD.LABEL') }}
              <input
                v-model.trim="credentials.password"
                type="password"
                data-testid="password_input"
                :placeholder="$t('LOGIN.PASSWORD.PLACEHOLDER')"
                @input="$v.credentials.password.$touch"
              />
            </label>
            <woot-submit-button
              :disabled="
                $v.credentials.email.$invalid ||
                  $v.credentials.password.$invalid ||
                  loginApi.showLoading
              "
              :button-text="$t('LOGIN.SUBMIT')"
              :loading="loginApi.showLoading"
              button-class="large expanded"
            >
            </woot-submit-button>
          </div>
        </form>
        <div class="column text-center sigin__footer">
          <p>
            <router-link to="auth/reset/password">
              {{ $t('LOGIN.FORGOT_PASSWORD') }}
            </router-link>
          </p>
          <p v-if="showSignupLink()">
            <router-link to="auth/signup">
              {{ $t('LOGIN.CREATE_NEW_ACCOUNT') }}
            </router-link>
          </p>
        </div>
      </div>
      <woot-spinner v-else size="" />
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';
import WootSubmitButton from '../../components/buttons/FormSubmitButton';
import { mapGetters } from 'vuex';
export default {
  components: {
    WootSubmitButton,
  },
  mixins: [globalConfigMixin],
  props: {
    ssoAuthToken: { type: String, default: '' },
    redirectUrl: { type: String, default: '' },
    config: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  data() {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      credentials: {
        email: '',
        password: '',
      },
      loginApi: {
        message: '',
        showLoading: false,
      },
      error: '',
    };
  },
  validations: {
    credentials: {
      password: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  computed: {
    ...mapGetters({
      globalConfig: 'globalConfig/get',
    }),
  },
  created() {
    if (this.ssoAuthToken) {
      this.login();
    }
  },
  methods: {
    showAlert(message) {
      // Reset loading, current selected agent
      this.loginApi.showLoading = false;
      this.loginApi.message = message;
      bus.$emit('newToastMessage', this.loginApi.message);
    },
    showSignupLink() {
      return window.chatwootConfig.signupEnabled === 'true';
    },
    login() {
      this.loginApi.showLoading = true;
      const credentials = {
        email: this.email ? this.email : this.credentials.email,
        password: this.credentials.password,
        sso_auth_token: this.ssoAuthToken,
      };
      this.$store
        .dispatch('login', credentials)
        .then(() => {
          this.showAlert(this.$t('LOGIN.API.SUCCESS_MESSAGE'));
        })
        .catch(response => {
          // Reset URL Params if the authentication is invalid
          if (this.email) {
            window.location = '/app/login';
          }
          if (response && response.status === 401) {
            const { errors } = response.data;
            const hasAuthErrorMsg = errors && errors.length && errors[0] && typeof errors[0] === 'string';
            if (hasAuthErrorMsg) {
              this.showAlert(errors[0]);
            } else {
              this.showAlert(this.$t('LOGIN.API.UNAUTH'));
            }
            return;
          }
          this.showAlert(this.$t('LOGIN.API.ERROR_MESSAGE'));
        });
    },
  },
};
</script>