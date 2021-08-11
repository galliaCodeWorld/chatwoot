<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-20">
      display sidebar
    </div>
    <div class="md-layout-item md-medium-size-70 md-xsmall-size-100 md-size-80 entity-leads">
      <md-card>
        <md-card-header>
          <div class="d-flex jusify-content-between align-baseline">
            <strong class="title" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Leads</strong>
            <div class="md-group">
              <md-button class="md-default md-raised md-dense">
                <span>
                  <i class="icon ion-arrow-return-left" />
                  <p class="mb-0 text-uppercase" @click="createLead">create lead</p>
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
          <div style="height: 100%">
            <div style="margin-bottom: 5px;">
              <input type="button" value="Frostier Year" v-on:click="frostierYear(Math.floor(Math.random() * 2) + 1)">
            </div>
            <AgGridVue
              style="width: 100%; height: 100%;"
              class="ag-theme-alpine"
              :components="components"
              :columnDefs="columnDefs"
              :rowData="rowData"
              :defaultColDef="defaultColDef"
              @grid-ready="onGridReady" />
          </div>
        </md-card-content>
        <md-card-actions>
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
        </md-card-actions>
      </md-card>
      <div style="height: 100%">
        <div style="margin-bottom: 5px;">
          <input type="button" value="Frostier Year" v-on:click="frostierYear(Math.floor(Math.random() * 2) + 1)">
        </div>
        <AgGridVue
          style="width: 100%; height: 100%;"
          class="ag-theme-alpine"
          :components="components"
          :columnDefs="columnDefs"
          :rowData="rowData"
          :defaultColDef="defaultColDef"
          @grid-ready="onGridReady" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import store from '../../../../store'
import { AgGridVue } from 'ag-grid-vue';
import CellVue from './cellVue.js';

const createImageSpan = (imageMultiplier, image) => {
  const resultElement = document.createElement('span');
  for (let i = 0; i < imageMultiplier; i++) {
      const imageElement = document.createElement('img');
      imageElement.src = 'https://www.ag-grid.com/example-assets/weather/' + image;
      resultElement.appendChild(imageElement);
  }
  return resultElement;
};

const deltaIndicator = params => {
  const element = document.createElement('span');
  const imageElement = document.createElement('img');
  if (params.value > 15) {
      imageElement.src = 'https://www.ag-grid.com/example-assets/weather/fire-plus.png';
  } else {
      imageElement.src = 'https://www.ag-grid.com/example-assets/weather/fire-minus.png';
  }
  element.appendChild(imageElement);
  element.appendChild(document.createTextNode(params.value));
  return element;
};

const daysSunshineRenderer = params => {
  const daysSunshine = params.value / 24;
  return createImageSpan(daysSunshine, params.rendererImage);
};

const rainPerTenMmRenderer = params => {
  const rainPerTenMm = params.value / 10;
  return createImageSpan(rainPerTenMm, params.rendererImage);
};

export default {
  name: 'entity-leads',
  computed: {
    ...mapGetters({
      leadState: 'enLeads/getState'
    })
  },
  components: {
    AgGridVue,
    CellVue,
  },
  // beforeRouteEnter(to, from, next) {
  //   store.dispatch('enLeads/search')
  //   .then(() => {
  //     console.log('test lead ...', store)
  //     next()
  //   })
  // },
  beforeMount() {
    alert()
    this.components = {
      deltaIndicator: deltaIndicator,
      daysSunshineRenderer: daysSunshineRenderer,
      rainPerTenMmRenderer: rainPerTenMmRenderer
    };
  },
  data: () => {
    return {
      gridApi: null,
      columnDefs: [
        {
          headerName: "Month",
          field: "Month",
          width: 75,
          cellStyle: {color: "darkred"}
        },
        {
          headerName: "Max Temp (\u02DAC)",
          field: "Max temp (C)",
          width: 120,
          cellRenderer: 'deltaIndicator'                      // Function cell renderer
        },
        {
          headerName: "Min Temp (\u02DAC)",
          field: "Min temp (C)",
          width: 120,
          cellRenderer: 'deltaIndicator'                      // Function cell renderer
        },
        {
          headerName: "Days of Air Frost",
          field: "Days of air frost (days)",
          width: 233,
          cellRendererFramework: 'CellVue',         // Component Cell Renderer
          cellRendererParams: {rendererImage: "frost.png"}    // Complementing the Cell Renderer parameters
        },
        {
          headerName: "Days Sunshine",
          field: "Sunshine (hours)",
          width: 190,
          cellRenderer: 'daysSunshineRenderer',
          cellRendererParams: {rendererImage: "sun.png"}      // Complementing the Cell Renderer parameters
        },
        {
          headerName: "Rainfall (10mm)",
          field: "Rainfall (mm)",
          width: 180,
          cellRenderer: 'rainPerTenMmRenderer',
          cellRendererParams: {rendererImage: "rain.png"}     // Complementing the Cell Renderer parameters
        }
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true
      }
      ,
      rowData: null
    }
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      const updateData = (data) => {
        console.log('test...', data)
        this.gridApi.setRowData(data);
      }
      fetch('https://www.ag-grid.com/example-assets/weather-se-england.json')
        .then(res => res.json())
        .then(data => updateData(data));
    },
    frostierYear(extraDaysFrost) {
      this.gridApi.forEachNode(rowNode => {
        rowNode.setDataValue('Days of air frost (days)', rowNode.data['Days of air frost (days)'] + extraDaysFrost);
      });
    },
    createLead() {
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
    .create-task:hover {
      cursor: pointer;
    }
  }
</style>