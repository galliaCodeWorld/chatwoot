/* eslint arrow-body-style: 0 */
import CampainesView from './index.vue';
import { frontendURL } from '../../../helper/URLHelper';

export const routes = [
  {
    path: frontendURL('accounts/:accountId/entity/campaines'),
    name: 'entity_campaines',
    roles: ['administrator', 'agent'],
    component: CampainesView,
  },
];

