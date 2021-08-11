/* eslint arrow-body-style: 0 */

import Sidebar from './Sidebar.vue'
import Fileds from './fields'
import Tags from './tags'
import Groups from './groups'
import { frontendURL } from '../../../helper/URLHelper';

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/admin'),
      name: 'admin_dashboard',
      roles: ['administrator'],
      component: Sidebar,
      redirect: frontendURL('accounts/:accountId/admin/fields'),
      children: [
        {
          path: 'fields',
          name: 'admin_dashboard_fields',
          roles: ['administrator'],
          component: Fileds,
        },
        {
          path: 'tags',
          name: 'admin_dashboard_tags',
          roles: ['administrator'],
          component: Tags,
        },
        {
          path: 'groups',
          name: 'admin_dashboard_groups',
          roles: ['administrator'],
          component: Groups,
        },
      ]
    },
  ]
}
