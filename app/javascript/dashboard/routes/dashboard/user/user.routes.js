/* eslint arrow-body-style: 0 */
import Leads from './leads';
import { frontendURL } from '../../../helper/URLHelper';

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/user'),
      name: 'user_dashboard',
      roles: ['administrator', 'agent'],
      redirect: frontendURL('accounts/:accountId/user/leads'),
      children: [
        {
          path: 'leads',
          name: 'user_dashboard_leads',
          roles: ['administrator', 'agent'],
          component: Leads,
        },
      ]
    },
  ]
}