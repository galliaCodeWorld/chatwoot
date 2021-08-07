import types from '../../../mutation-types'

const mutations = {
  [types.admin.viewsearch](state, viewsearch) {
    state.viewsearch = viewsearch
  },
  [types.SET_ERROR](state, error) {
    state.error = error
  },
  [types.SET_MSG](state, msg) {
    state.msg = msg
  },
};

export default mutations;