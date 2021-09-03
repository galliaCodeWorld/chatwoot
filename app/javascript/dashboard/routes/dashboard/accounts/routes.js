/* eslint arrow-body-style: 0 */
import AccountsView from './index.vue';
import { frontendURL } from '../../../helper/URLHelper';

export const routes = [
  {
    path: frontendURL('accounts/:accountId/entity/accounts'),
    name: 'entity_accounts',
    roles: ['administrator', 'agent'],
    component: AccountsView,
  },
];

