/* eslint arrow-body-style: 0 */
import Entity from './entity.vue'
import Leads from './leads'
import { frontendURL } from '../../../helper/URLHelper'

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/entity'),
      name: 'entity',
      roles: ['administrator', 'agent'],
      component: Entity,
      redirect: frontendURL('accounts/:accountId/entity/leads'),
      children: [
        {
          path: 'leads',
          name: 'entity_leads',
          roles: ['administrator', 'agent'],
          component: Leads,
        },
      ]
    },
  ]
}
