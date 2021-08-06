import {admin} from '../../../mutation-types'

const actions = {
  search: async (context, creds) => {
    context.commit(types.admin.viewsearch, creds)
  }
};

export default actions;