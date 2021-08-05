import VueRouter from 'vue-router';
import auth from 'common/api/auth';
import authRouter from './auth.js'
import { frontendURL } from '../helper/URLHelper';

const routes = [
  {
    path: '/app',
    redirect: '/app/auth',
  },
  ...authRouter.routes
];

window.roleWiseRoutes = {
  agent: [],
  administrator: [],
};

// generateRoleWiseRoute - updates window object with agent/admin route
const generateRoleWiseRoute = route => {
  route.forEach(element => {
    if (element.children) {
      generateRoleWiseRoute(element.children);
    }
    if (element.roles) {
      element.roles.forEach(roleEl => {
        window.roleWiseRoutes[roleEl].push(element.name);
      });
    }
  });
};
// Create a object of routes
// accessible by each role.
// returns an object with roles as keys and routeArr as values
generateRoleWiseRoute(routes);

export const router = new VueRouter({ mode: 'history', routes });

// const unProtectedRoutes = ['auth', 'auth/login',];

// const authIgnoreRoutes = [
//   'auth_confirmation',
//   'pushBack',
//   'auth_password_edit',
// ];

// function routeIsAccessibleFor(route, role) {
//   return window.roleWiseRoutes[role].includes(route);
// }

// const routeValidators = [
//   {
//     protected: false,
//     loggedIn: true,
//     handler: () => 'dashboard',
//   },
//   {
//     protected: true,
//     loggedIn: false,
//     handler: () => 'auth',
//   },
//   {
//     protected: true,
//     loggedIn: true,
//     handler: to => {
//       const user = auth.getCurrentUser();
//       const isAccessible = routeIsAccessibleFor(to, user.role);
//       return isAccessible ? null : 'dashboard';
//     },
//   },
//   {
//     protected: false,
//     loggedIn: false,
//     handler: () => null,
//   },
// ];

// export const validateAuthenticateRoutePermission = (to, from, next) => {
//   const isLoggedIn = auth.isLoggedIn();
//   const isProtectedRoute = !unProtectedRoutes.includes(to.name);
//   const strategy = routeValidators.find(
//     validator =>
//       validator.protected === isProtectedRoute &&
//       validator.loggedIn === isLoggedIn
//   );
//   const nextRoute = strategy.handler(to.name);
//   return nextRoute ? next(frontendURL(nextRoute)) : next();
// };

// const validateRouteAccess = (to, from, next) => {
//   if (
//     window.chatwootConfig.signupEnabled !== 'true' &&
//     to.meta &&
//     to.meta.requireSignupEnabled
//   ) {
//     const user = auth.getCurrentUser();
//     next(frontendURL(`accounts/${user.account_id}/dashboard`));
//   }

//   if (authIgnoreRoutes.includes(to.name)) {
//     return next();
//   }
//   return validateAuthenticateRoutePermission(to, from, next);
// };

// // protecting routes
router.beforeEach((to, from, next) => {
  console.log('router.beforeEach...', to, from)
  next();
  // if (!to.name) {
  //   const user = auth.getCurrentUser();
  //   console.log('test user...', user)
  //   if (user) return next(frontendURL(`accounts/${user.account_id}/dashboard`));
  //   else if (to.path !== '/app/auth') return next(frontendURL('auth'));
  // } else return validateRouteAccess(to, from, next);
});

export default router;
