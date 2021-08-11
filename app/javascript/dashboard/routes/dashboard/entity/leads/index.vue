<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-20 lead">
      display sidebar
    </div>
    <div class="md-layout-item md-medium-size-70 md-xsmall-size-100 md-size-80 lead">
      <md-card>
        <md-card-header>
          <div class="d-flex jusify-content-between align-baseline">
            <strong class="title" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Leads</strong>
            <div class="md-group">
              <md-button class="md-default md-raised md-dense">
                <span>
                  <i class="icon ion-arrow-return-left" />
                  <p class="mb-0 text-uppercase">create lead</p>
                </span>
              </md-button>
            </div>
          </div>
        </md-card-header>
        <md-card-content>
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
        </md-card-content>
        <md-card-footer>
          <div class="d-flex justify-content-between align-baseline">
            <div class="md-group">
              <md-button class="md-dense">xls</md-button>
              <md-button class="md-dense">csv</md-button>
              <md-button class="md-dense">rss</md-button>
              <md-button class="md-dense">atom</md-button>
              <md-button class="md-dense">perm</md-button>
            </div>
            <div>
              implement pagenation
            </div>
          </div>
        </md-card-footer>
      </md-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import store from '../../../../store'
import { AgGridVue } from 'ag-grid-vue';
// import { AgGridVue } from '@ag-grid-community/vue';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

export default {
  name: 'lead',
  computed: {
    ...mapGetters({
      leadState: 'enLeads/getState'
    })
  },
  components: {
    AgGridVue,
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('enLeads/search')
    .then(() => {
      console.log('test lead ...', store)
      next()
    })
  },
  beforeMount() {
    this.gridOptions = {
      autoGroupColumnDef: {
        minWidth: 50,
        maxWidth: 100,
      },
    };
    // cellRendererFramework: 'lead-status',
    this.defaultColDef = {
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    };
  },
  mounted() {
    this.rowData = store.getters.urLeadsStates.leads
  },
  data: () => {
    return {
      modules: AllCommunityModules,
      gridOptions: null,
      columnDefs:  [
        {field: 'cus', pinned: 'left',
          cellRendererFramework: CubeComponent
        },
        {field: 'fullUserName',
          valueGetter: ev => {
            let data = ev.data
            let temp = ''
            if (data.first_name && data.last_name) {
              if (data.first_name) temp += data.first_name
              if (data.last_name) temp.length ? temp += ` ${data.last_name}` : temp = data.last_name
            } else temp = data.email
            return temp
          },},
        {field: 'company',},
      ],
      defaultColDef: null,
      rowData: null,
    };
  },
  methods: {
    onGridReady(params) {
      const updateData = data => {
        params.api.setRowData(data.slice(0, 100));
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
    fullUserName(data) {
      let temp = ''
      if (data.first_name && data.last_name) {
        if (data.first_name) temp += data.first_name
        if (data.last_name) temp.length ? temp += ` ${data.last_name}` : temp = data.last_name
      } else temp = data.email
      return temp
    },
    createTask() {
      alert('view create form...');
    },
    download(ext) {
      switch(ext) {
        case '.xls': {
        }
        case '.csv': {
        }
        case '.rss': {
        }
        case '.atom': {
        }
        case '.perm': {
        }
      }
      alert('download- *'+ext)
    }
  },
};
</script>
<style lang="scss">
  .lead {
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
    .md-card-header {
      padding: 0;
    }
    .md-card-tabs .md-list .md-list-item .md-list-item-button .md-list-item-content {
      padding: 0;
    }
    .tab-content {
      display: inline;
    }
    .create-task:hover {
      cursor: pointer;
    }
  }
</style>
