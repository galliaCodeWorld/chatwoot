import Layout from 'pages/auth/Layout.vue'
import Login from 'pages/auth/Login.vue'
import { frontendURL } from 'helper/URLHelper';

export default {
  routes: [
    {
      path: frontendURL('auth'),
      name: 'auth',
      component: Layout,
      redirect: frontendURL('auth/login'),
      children: [
        {
          path: 'login',
          component: Login,
          name: 'login',
          props: route => ({
            config: route.query.config,
            email: route.query.email,
            ssoAuthToken: route.query.sso_auth_token,
            redirectUrl: route.query.route_url,
          })
        },
      ]
    },
  ],
};