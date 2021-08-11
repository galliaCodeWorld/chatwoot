<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-20">
      display sidebar
    </div>
    <div class="md-layout-item md-medium-size-70 md-xsmall-size-100 md-size-80 entity-leads">
      <md-autocomplete
        class="search"
        v-model="leadState.query"
        :md-options="[]"
        :md-open-on-focus="false"
      >
        <label>type search contenten</label>
      </md-autocomplete>
      <div style="height: 100%">
        <AgGridVue
          style="width: 100%; height: 100%;"
          class="ag-theme-alpine"
          :components="components"
          :defaultColDef="defaultColDef"
          :columnDefs="columnDefs"
          :rowData="rowData"
          :animateRows="true"
          :pagination="true"
          :paginationPageSize="10"
          :suppressPaginationPanel="true"
          @grid-ready="onGridReady" />
      </div>
      <div class="d-flex justify-content-between align-baseline">
        <div class="md-group">
          <md-button class="md-dense" @click="download('xls')">xls</md-button>
          <md-button class="md-dense" @click="download('csv')">csv</md-button>
        </div>
      </div>
          <!-- <div v-for="(lead,n) in urLeadsStates.leads" :key="'tag'+n" class="lead-info">
            <DetailLead :lead="lead"/>
            <md-divider class="md-hr md-theme-demo-light" />
          </div> -->
          <!-- <AgGridVue
            ref="leads_table"
            class="ag-theme-alpine w-100 my-4 h-100"
            :gridOptions="gridOptions"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :modules="modules"
            :animateRows="true"
            :pagination="true"
            :paginationPageSize="true"
            :suppressPaginationPanel="true"
            @grid-ready="onGridReady"
          /> -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import { AgGridVue } from 'ag-grid-vue';

const statusRender = Vue.extend({
  template:
    `<div class="strip" style="width: 100px;" :style="style">
      <strong v-html="params.value" />
    </div>`,
  name: 'leads-cell-status',
  computed: {
    style() {
      let style = ''
      switch(this.params.value) {
        case 'rejected':
          style = 'background: OrangeRed;'
        case 'new':
          style = 'background: Silver;'
        case 'converted':
          style = 'background: Turquoise'
        case 'contacted':
          style = 'background: Lime;'
      }
      return style
    }
  },
})
const iconRender = params => {
  const resultElement = document.createElement('span');
  for (let i in params.value) {
    const iconElement = document.createElement('i');
    iconElement.className = params.icon
    resultElement.appendChild(iconElement)
  }
  return resultElement;
}
const createRenderer = params => {
  let create = new Date(params.value)
  let now  = new Date()
  let str = checkTime(now.getFullYear() - create.getFullYear(), 'year')
  if (str) return str
  else {
    str = checkTime(now.getMonth() - create.getMonth(), 'month')
    if (str) return str
    else {
      str = checkTime(now.getDate() - create.getDate(), 'day')
      if (str) return str
      else {
        str = checkTime(now.getHours() - create.getHours(), 'hour')
        if (str) return str
        else {
          str = checkTime(now.getMinutes() - create.getMinutes(), 'min')
          return str ? str : `added about secs ago`
        }
      }
    }
  }
}
const checkTime = (gap, str) => {
  let reStr = gap > 1 ? `${str}s` : str
  return gap > 0 ? `added about ${gap} ${reStr} ago` : null
}

export default {
  name: 'entity-leads',
  components: {
    AgGridVue,
  },
   data: () => {
    return {
      gridApi: null,
      columnDefs: [
        {
          headerName: "Status",
          field: "status",
          width: 75,
          cellRendererFramework: 'statusRender'
        },
        {
          headerName: "Name",
          width: 120,
          cellStyle: {color: 'blue'},
          valueGetter: ev => {
           return `${ev.data.first_name} ${ev.data.last_name}`
          }
        },
        {
          headerName: 'reffer',
          field: 'referred_by',
          width: 75,
          cellStyle: {color: 'silver'}
        },
        {
          headerName: 'rank',
          field: 'rating',
          width: 75,
          cellRenderer: 'iconRender',
          cellRendererParams: {icon: 'icon ion-star'}
        },
        {
          headerName: 'Email',
          field: 'email',
          width: 75,
          cellStyle: {color: 'blue'}
        },
        {
          headerName: 'Phone',
          field: 'phone',
          width: 75,
          cellStyle: {color: 'darkgrey'}
        },
        {
          headerName: 'CreatedAt',
          field: 'created_at',
          width: 75,
          cellRenderer: 'createRender'
        },
      ],
      defaultColDef: {
        editable: false,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true
      },
      rowData: null
    }
  },
  computed: {
    ...mapState({
      query: state => state.enLeads.query,
    }),
    ...mapGetters({
      leadState: 'enLeads/getState'
    })
  },
  watch: {
    query(newValue, opldValue) {
      this.$store.dispatch('enLeads/search', newValue ? newValue : null)
      .then(() => {
        console.log('test api...', this.leadState)
      })
    }
  },
  beforeMount() {
    this.components = {
      statusRender,
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      const updateData = data => {
        this.gridApi.setRowData(data);
      }
      this.$store.dispatch('enLeads/search').then(() => {
        update(this.leadState.leads)
      })
    },
    createLead() {
    },
    download(ext) {
      switch(ext) {
        case '.xls': {
        }
        case '.csv': {
        }
      }
    }
  },
};
</script>
<style lang="scss">
  .entity-leads {
    .strip {
      height: 20px;
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
