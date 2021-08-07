import types from '../../../mutation-types'

const actions = {
  viewSearch: async (context, creds) => {
    context.commit(types.admin.viewsearch, creds)
  },
  setError: async (context, err) => {
    context.commit(types.SET_ERROR, err)
  },
  setMsg: async (context, msg) => {
    context.commit(types.SET_MSG, msg)
  }
};

export default actions;