<template>
  <header class="header">
    <div class="table-actions-wrap">
      <div class="left-aligned-wrap">
        <h1 class="page-title">
          {{ $t('LEADS_PAGE.HEADER') }}
        </h1>
      </div>
      <div class="right-aligned-wrap">
        <div class="search-wrap">
          <md-toolbar class="md-primary">
            <div class="md-toolbar-row">
              <div class="md-toolbar-section-start">
                <i class="ion-ios-search-strong search-icon" />
              </div>
              <md-autocomplete
                class="search"
                v-model="query"
                :md-options="queryHistory"
                md-layout="box">
                <label>$t('LEADS_PAGE.SEARCH_INPUT_PLACEHOLDER')</label>
              </md-autocomplete>
            </div>
          </md-toolbar>
          <md-button class="md-primary md-raised md-dense" @click="createLead">{{ $t('LEADS_PAGE.SEARCH_BUTTON') }}</md-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'leads-header',
  props: {
    query: {
      type: String,
      default: null
    },
    queryHistory: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    query: props => props.query
  },
  watch: {
    query(newValue, oldValue) {
      this.$store.dispatch('enLeads/search', newValue ? newValue : null)
      .then(() => {
        console.log('test api...', this.leadState)
      })
    }
  },
  methods: {
    createLead() {
      alert('create leads...')
    },
  },
};
</script>

<style lang="scss" scoped>
.page-title {
  margin: 0;
}
.table-actions-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-small) var(--space-normal) var(--space-small)
    var(--space-normal);
}

.left-aligned-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-aligned-wrap {
  display: flex;
}

.search-wrap {
  width: 400px;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: var(--space-small);

  .search-icon {
    position: absolute;
    top: 1px;
    left: var(--space-one);
    height: 3.8rem;
    line-height: 3.6rem;
    font-size: var(--font-size-medium);
    color: var(--b-700);
  }
}
</style>
