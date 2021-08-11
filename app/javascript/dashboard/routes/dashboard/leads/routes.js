/* eslint arrow-body-style: 0 */
import LeadsView from './components/LeadsView';
import LeadManageView from './pages/LeadManageView';
import { frontendURL } from '../../../helper/URLHelper';

export const routes = [
  {
    path: frontendURL('accounts/:accountId/contacts'),
    name: 'leads_dashboard',
    roles: ['administrator', 'agent'],
    component: LeadsView,
  },
  {
    path: frontendURL('accounts/:accountId/contacts/:contactId'),
    name: 'leads_dashboard_manage',
    roles: ['administrator', 'agent'],
    component: LeadManageView,
    props: route => {
      return { contactId: route.params.contactId };
    },
  },
];
