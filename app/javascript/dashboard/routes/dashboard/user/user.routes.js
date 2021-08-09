/* eslint arrow-body-style: 0 */
// import Sidebar from './Sidebar.vue'
import Leads from './users'
import { frontendURL } from '../../../helper/URLHelper';

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/user'),
      name: 'admin_dashboard',
      roles: ['administrator','agent'],
      component: Sidebar,
      redirect: frontendURL('accounts/:accountId/user/leads'),
      children: [
        {
          path: 'leads',
          name: 'user_dashboard_leads',
          roles: ['administrator','agent'],
          component: Leads,
        },
      ]
    },
  ]
}
