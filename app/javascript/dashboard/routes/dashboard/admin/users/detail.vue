<template>
  <div class="ad-users-detail md-layout d-flex justify-content-between align-baseline pt-1 pb-1"
    @mouseover="btToggle = true" @mouseleave="btToggle = false"
  >
    <div class="d-flex justify-content-between align-baselne">
      <div class="strip" style="width: auto;"
        :style="user.suspended_at ? '' : user.admin ? 'background: #90ee90;' : 'background: #add8e6;'"
      >
        <strong v-html="user.suspended_at ? 'Suspended' : user.admin ? 'Admin' : 'Active'" />
      </div>
      <div style="padding-left: 10px;">
        <span class="d-flex">
          <a :href="`localhost:3000/app/users/:${user.id}`" v-html="fullUserName" />
          <small v-html="titleCompany" style="padding-left: 3px;" />
          <small v-html="logins" style="padding-left: 3px;" />
          <small v-html="lastLogged" style="padding-left: 3px;" :style="stLastLogged" />
        </span>
        <span class="d-flex">
          <a :href="'mailto: '+user.email">{{user.email}}</a>
          <small v-html="user.phone ? '| phone: ': ''" style="padding-left: 3px;" />
          <small v-html="user.phone" style="color: black; padding-left: 3px;"/>
          <small v-html="user.mobile ? '| mobile: ' : ''" style="padding-left: 3px;" />
          <small v-html="user.mobile" style="color: black; padding-left: 3px;" />
          <small 
            v-html="dateString"
            style="color: black; padding-left: 3px;" 
            :style="user.suspended_at ? 'color: red;' : ''"
          />
        </span>
      </div>
    </div>
    <div class="md-group h-75" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
      <md-button class="md-info" @click="showModal">Edit</md-button>
      <md-button class="md-warning" @click="suspendUser" 
        v-html="user.suspended_at ? 'Reactive' : 'Suspended'" />
      <md-button class="md-danger" @click="deleteUser">Delete?</md-button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: 'ad-users-detail',
  props: {
    query: {
      type: String,
      default: null
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      btToggle: false
    };
  },
  
  computed: {
    fullUserName() {
      let user = this.$props.user
      let temp = ''
      if (user.first_name && user.last_name) {
        if (user.first_name) temp += user.first_name
        if (user.last_name) temp.length ? temp += ` ${user.last_name}` : temp = user.last_name
      } else temp = user.email
      temp += ` (${user.username})`
      return temp
    },
    titleCompany() {
      let user = this.$props.user
      let temp = ''
      if (user.title) temp += ` - ${user.title}`
      if (user.company) temp.length ? temp += ` at ${user.company}` : temp = ` at ${user.company}`
      return temp
    },
    logins() {
      return '| logins pending'
    },
    lastLogged() {
      return '| lastLogged pending'
    },
    stLastLogged() {
      return 'color: red;'
    },
    dateString() {
      let user = this.$props.user
      let temp = '| '
      let date
      if (user.suspended_at) date = new Date(user.suspended_at).toString().split(new RegExp(' ', 'gi'))
      else {
        temp = '| user since '
        date = new Date(user.created_at).toString().split(new RegExp(' ', 'gi'))
      }
      temp += `${date[1]} ${date[2]} ${date[3]}`
      return temp
    }
  },
  methods: {
    showModal() {
      this.$store.dispatch('adUsers/show', this.$props.user.id).then(user => {
        if (user) {
          this.$store.dispatch('adUsers/search', this.$props.query).then(() => {
            if (this.$props.user.id) this.$store.dispatch('adUsers/editID', this.$props.user.id)
          })
        }
      })
    },
    deleteUser() {
      let username = JSON.stringify(this.$props.user.username)
      Swal.fire({
        title: 'Are you sure?',
        text: `Not be able to recover "${username}"!`,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('adUsers/delete', this.$props.user.id)
          .then(() => {
            Promise.all([
              this.$store.dispatch('adUsers/search'),
              this.$store.dispatch('adGroups/get'),
            ]).then(() => {
              this.$store.dispatch('adGlobal/setMsg', `Deleted "${username}"..`)
            })
          })
        }
      })
    },
    suspendUser() {
      let suspend = JSON.parse(JSON.stringify(this.$props.user.suspended_at))
      let username = JSON.stringify(this.$props.user.username)
      this.$store.dispatch('adUsers/sustoggle', {id: this.$props.user.id, suspend_at:this.$props.user.suspended_at})
      .then(() => {
        Promise.all([
          this.$store.dispatch('adUsers/search'),
          this.$store.dispatch('adGroups/get'),
        ]).then(() => {
          this.$store.dispatch('adGlobal/setMsg', `${username} is ${suspend ? 'Reactive' : 'Suspended'}!`)
        })
      })
    },
  },
};
</script>

<style lang="scss">
.ad-users-detail:hover {
  background: #efefef;;
}
.ad-users-detail{
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
