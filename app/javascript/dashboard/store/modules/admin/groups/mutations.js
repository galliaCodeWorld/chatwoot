import types from '../../../mutation-types'

const mutations = {
  [types.SET_ERROR](state, error) {
    state.error = error;
  },
  [types.admin.groups.editID](state, editID) {
    state.editID = editID
  },
  [types.admin.groups.getall](state, groups) {
    state.groups = groups
  },
  [types.admin.groups.getone](state, group) {
    state.group = group
  },
};

export default mutations;