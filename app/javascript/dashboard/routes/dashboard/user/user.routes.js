/* eslint arrow-body-style: 0 */
import Leads from './leads'
import { frontendURL } from '../../../helper/URLHelper';

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/user'),
      name: 'user_dashboard',
      roles: ['administrator','agent'],
      // component: Sidebar,
      redirect: frontendURL('accounts/:accountId/user/leads'),
      children: [
        
        {
          path: 'leads',
          name: 'user_dashboard_groups',
          roles: ['administrator','agent'],
          component: Leads,
        },
      ]
    },
  ]
}
