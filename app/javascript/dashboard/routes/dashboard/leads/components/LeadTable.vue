<template>
  <section class="leads-table-wrap">
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
  </section>
</template>

<script>
  import Vue from "vue";
  import { AgGridVue } from 'ag-grid-vue';

  const statusRender = Vue.extend({
    template:
      `<div class="strip" style="width: 100px;" :style="style">
        <strong v-html="params.value" />
      </div>`,
    name: 'lead-table-cell-status',
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
    name: 'leads-table',
    props: {
      leads: {
        type: Array,
        default: () => []
      }
    },
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
            valueGetter: params => {
            return `${params.data.first_name} ${params.data.last_name}`
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
        updateData(this.$props.leads)
      },
    },
  }
</script>

<style lang="scss" scoped>
.leads-table-wrap {
  flex: 1 1;
  height: 100%;
  overflow: hidden;
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
