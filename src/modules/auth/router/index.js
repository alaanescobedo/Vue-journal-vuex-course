export default {
  name: 'router',
  component: () => import(/*webpackChunkName: authLayout*/ '@/modules/auth/layouts/AuthLayout'),
  children: [
    {
      path: '',
      name: 'login',
      component: () => import(/*webpackChunkName: auth-login*/ '@/modules/auth/views/Login'),
    },
    {
      path: 'register',
      name: 'registro',
      component: () => import(/*webpackChunkName: auth-login*/ '@/modules/auth/views/Registro'),
    },
  ],
};
