/* eslint arrow-body-style: 0 */
export const routes = [
  {
    path: frontendURL('accounts/:accountId/contacts'),
    name: 'contacts_dashboard',
    roles: ['administrator', 'agent'],
    component: ContactsView,
  },
  {
    path: frontendURL('accounts/:accountId/contacts/:contactId'),
    name: 'contacts_dashboard_manage',
    roles: ['administrator', 'agent'],
    component: ContactManageView,
    props: route => {
      return { contactId: route.params.contactId };
    },
  },
];