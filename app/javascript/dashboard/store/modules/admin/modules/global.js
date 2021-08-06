import { act_admin } from "../../typess/actions.types";
import { mut_admin } from "../../typess/mutations.types";

const state = {
  viewsearch: true,
};

const getters = {
  adGlobalStates(state) {
    return state
  }
};
const actions = {
  [act_types.admin.viewsearch](context, credentials) {
    context.commit(mut_types.admin.viewsearch, credentials)
  },
};

const mutations = {
  [mut_types.admin.viewsearch](state, viewsearch) {
    state.viewsearch = viewsearch
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};


/* eslint no-console: 0 */
/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */
import * as MutationHelpers from 'shared/helpers/vuex/mutationHelpers';
import * as typess from '../mutation-types';
import AccountAPI from '../../api/account';

const state = {
  records: [],
  uiFlags: {
    isFetching: false,
    isFetchingItem: false,
    isUpdating: false,
  },
};

const getters = {
  getAccount: $state => id => {
    return $state.records.find(record => record.id === Number(id));
  },
  getUIFlags($state) {
    return $state.uiFlags;
  },
};

const actions = {
  get: async ({ commit }) => {
    commit(typess.default.SET_ACCOUNT_UI_FLAG, { isFetchingItem: true });
    try {
      const response = await AccountAPI.get();
      commit(typess.default.ADD_ACCOUNT, response.data);
      commit(typess.default.SET_ACCOUNT_UI_FLAG, {
        isFetchingItem: false,
      });
    } catch (error) {
      commit(typess.default.SET_ACCOUNT_UI_FLAG, {
        isFetchingItem: false,
      });
    }
  },
  update: async ({ commit }, updateObj) => {
    commit(typess.default.SET_ACCOUNT_UI_FLAG, { isUpdating: true });
    try {
      await AccountAPI.update('', updateObj);
      commit(typess.default.SET_ACCOUNT_UI_FLAG, { isUpdating: false });
    } catch (error) {
      commit(typess.default.SET_ACCOUNT_UI_FLAG, { isUpdating: false });
      throw new Error(error);
    }
  },
  create: async ({ commit }, accountInfo) => {
    commit(typess.default.SET_ACCOUNT_UI_FLAG, { isCreating: true });
    try {
      const response = await AccountAPI.createAccount(accountInfo);
      const account_id = response.data.data.account_id;
      commit(typess.default.SET_ACCOUNT_UI_FLAG, { isCreating: false });
      return account_id;
    } catch (error) {
      commit(typess.default.SET_ACCOUNT_UI_FLAG, { isCreating: false });
      throw error;
    }
  },
};

const mutations = {
  [typess.default.SET_ACCOUNT_UI_FLAG]($state, data) {
    $state.uiFlags = {
      ...$state.uiFlags,
      ...data,
    };
  },
  [typess.default.ADD_ACCOUNT]: MutationHelpers.setSingleRecord,
  [typess.default.EDIT_ACCOUNT]: MutationHelpers.update,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
