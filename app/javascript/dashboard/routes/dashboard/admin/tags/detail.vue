<template>
  <div class="md-layout d-flex justify-content-between align-baseline pt-1 pb-1 ad-tags-detail"
    @mouseover="btToggle = true" @mouseleave="btToggle = false">
    <div class="d-flex">
      <div class="strip" style="background: #add8e6; width: auto;">
        <strong style="font-size: 15px;" v-html="tag.name" />
      </div>
    </div>
    <div class="md-group" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
      <md-button class="md-icon-button md-info md-raised md-dense" @click="showModal">
        <i class="icon ion-edit"></i>
      </md-button>
      <md-button class="md-icon-button md-danger md-raised md-dense" @click="deleteTag">
        <i class="icon ion-android-delete"></i>
      </md-button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: 'ad-tags-detail',
  props: {
    tag: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      btToggle: false
    };
  },
  methods: {
    showModal() {
      this.$store.dispatch('adTags/get', this.$props.tag.id).then(tag => {
        if (tag) {
          this.$store.dispatch('adTags/get').then(() => {
            this.$store.dispatch('adTags/editID', this.$props.tag.id)
          })
        }
      })
    },
    deleteTag() {
      let tmp = JSON.stringify(this.$props.tag.name)
      Swal.fire({
        title: 'Are you sure?',
        text: `You will not be able to recover "${tmp}" tag!`,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('adTags/delete', this.$props.tag.id).then(() => {
            this.$store.dispatch('adTags/get').then(() => {
              this.$store.dispatch('global/setMsg', `Deleted "${tmp}" tag..`)
            })
          })
        }
      })
    },
  },
};
</script>

<style lang="scss">
.ad-tags-detail:hover {
  background: #efefef;;
}
.ad-tags-detail{
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
