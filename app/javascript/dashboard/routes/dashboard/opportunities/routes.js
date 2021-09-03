/* eslint arrow-body-style: 0 */
import OpportunitiesView from './index.vue';
import { frontendURL } from '../../../helper/URLHelper';

export const routes = [
  {
    path: frontendURL('accounts/:accountId/entity/opportunities'),
    name: 'entity_opportunities',
    roles: ['administrator', 'agent'],
    component: OpportunitisView,
  },
];

