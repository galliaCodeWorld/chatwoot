import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

const state = {
  leads: [],
  lead: {
    info: {},
    tasks: [],
    histories: [],
  },
  query: null,
  queryHistory: [],
  editID: -1,
  page : {num: 1, size: 10}
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
