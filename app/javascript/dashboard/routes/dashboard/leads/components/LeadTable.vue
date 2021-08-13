<template>
  <section class="leads-table-wrap">
    <AgGridVue
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      :components="components"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="rowData"
      rowSelection="single"
      :animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      :suppressPaginationPanel="true"
      @row-selected="onRowSelected"
      @grid-ready="onGridReady" />
  </section>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import store from '../../../../store';
  import { AgGridVue } from 'ag-grid-vue';
  import StatusRender from './frameworks/cellrender/status.vue';

  const iconRender = params => {
    const resultElement = document.createElement('span');
    // for (let i = 0; i < params.value; i++) {
    //   const iconElement = document.createElement('i');
    //   iconElement.className = params.icon
    //   resultElement.appendChild(iconElement)
    // }
    for (let i = 0; i < 5; i++) {
      const iconElement = document.createElement('i');
      iconElement.className = params.icon
      resultElement.appendChild(iconElement)
    }
    return resultElement;
  }
  const createAtRender = params => {
    const resultElement = document.createElement('p');
    let create = new Date(params.value)
    let now  = new Date()
    let str = checkTime(now.getFullYear() - create.getFullYear(), 'year')
    if (!str) {
      str = checkTime(now.getMonth() - create.getMonth(), 'month')
      if (!str) {
        str = checkTime(now.getDate() - create.getDate(), 'day')
        if (!str) {
          str = checkTime(now.getHours() - create.getHours(), 'hour')
          if (!str) {
            str = checkTime(now.getMinutes() - create.getMinutes(), 'min')
            if (!str) str = `added about secs ago`
          }
        }
      }
    }
    resultElement.appendChild(document.createTextNode(str))
    resultElement.className = "ag-cell m-0 p-0"
    return resultElement;
  }
  const checkTime = (gap, str) => {
    let reStr = gap > 1 ? `${str}s` : str
    return gap > 0 ? `added about ${gap} ${reStr} ago` : null
  }
  const checkboxSelection = params => {
    console.log('test checkboxSelection..', params, params.node)
    // Promise.all([
    //   store.dispatch('enLeads/editID', -1),
    //   store.dispatch('enLeads/editing', false)
    // ]).thend()
    return true
  }
  export default {
    name: 'leads-table',
    components: {
      AgGridVue,
      StatusRender
    },
    props: {
      leads: {
        type: Array,
        default: () => []
      },
      query: {
        type: String,
        default: null
      },
    },
    computed: {
      wQuery: props => props.query
    },
    watch: {
      wQuery(newValue, oldValue) {
        this.$store.dispatch('enLeads/search', newValue).then(() => {
          this.updateRowData(this.leads)
        })
      }
    },
    data: () => {
      return {
        gridApi: null,
        columnDefs: [
          {
            headerName: 'Status',
            field: "status",
            width: 75,
            checkboxSelection: checkboxSelection,
            cellRendererFramework: 'StatusRender',
          },
          {
            headerName: 'Name',
            width: 120,
            cellStyle: {color: 'blue'},
            valueGetter: params => {
              return `${params.data.first_name} ${params.data.last_name}`
            }
          },
          {
            headerName: 'Referred',
            field: 'referred_by',
            width: 75,
            cellStyle: {color: 'silver'}
          },
          {
            headerName: 'Rank',
            field: 'rating',
            width: 75,
            cellStyle: {color: 'orangered'},
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
            cellRenderer: 'createAtRender'
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
        StatusRender,
        iconRender,
        createAtRender,
      };
    },
    methods: {
      onGridReady(params) {
        this.gridApi = params.api;
        this.updateRowData(this.$props.leads)
      },
      updateRowData(data) {
        this.gridApi.setRowData(data)
      },
      onRowSelected(ev) {
        console.log('onRowSelected...', ev.node.data)
        // if (ev.node.isSelected)
        //   this.$store.dispatch('enLeads/show', ev.node.data.id).then(res => {
        //     if (res)
        //       Promise.all([
        //         this.$store.dispatch('enLeads/editID', res.id),
        //         this.$store.dispatch('enLeads/editing', false)
        //       ])
        //   })
        // else
        //   Promise.all([
        //     this.$store.dispatch('enLeads/editID', -1),
        //     this.$store.dispatch('enLeads/editing', false)
        //   ])
      },
    },
  };
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
