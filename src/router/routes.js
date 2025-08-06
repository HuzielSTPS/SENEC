import LoginPage from 'pages/LoginPage'

const routes = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/senec/Index.vue') },
      // { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'users', component: () => import('pages/sys/users/Index.vue') },
      { path: 'users/new', component: () => import('pages/sys/users/New.vue') },
      { path: 'users/:id', component: () => import('pages/sys/users/Edit.vue') },
      { path: 'profile', component: () => import('pages/sys/users/Profile.vue') },

      { path: 'roles', component: () => import('pages/sys/roles/Index.vue') },
      { path: 'roles/new', component: () => import('pages/sys/roles/New.vue') },
      { path: 'roles/:id', component: () => import('pages/sys/roles/Edit.vue') },

      { path: 'accounts', component: () => import('pages/sys/accounts/Index.vue') },
      { path: 'accounts/new', component: () => import('pages/sys/accounts/New.vue') },
      { path: 'accounts/:id', component: () => import('pages/sys/accounts/Edit.vue') },

      { path: 'search', component: () => import('pages/search/Index.vue') },
      { path: 'search/:id', component: () => import('pages/search/Edit.vue') },

      { path: 'search-imss/:id', component: () => import('pages/searchImss/IndexImss.vue') },

      { path: 'home', component: () => import('pages/senec/Index.vue') },
      // { path: 'homez', component: () => import('pages/principal/Index.vue') },
      { path: 'home/:id/:id2', component: () => import('pages/principal/Index.vue') },

      { path: 'movements', component: () => import('pages/sys/movements/Index.vue') },
      { path: 'movements/new', component: () => import('pages/sys/movements/New.vue') },
      { path: 'movements/:id', component: () => import('pages/sys/movements/Edit.vue') },

      { path: 'logs', component: () => import('pages/sys/logs/Index.vue') },

      { path: 'echarts', component: () => import('pages/echarts/LineChart.vue') },

      { path: 'charts', component: () => import('pages/charts/Tablero.vue') },

      { path: 'power-bi', component: () => import('pages/PowerBi/Tablero.vue') },

      { path: 'power-bi-imss', component: () => import('pages/PowerBi/SubResgistroSat.vue') },

      { path: 'power-ta-centros', component: () => import('pages/PowerBi/TavsCentros.vue') },

      { path: 'power-bi-seguridad-imss', component: () => import('pages/PowerBi/SubResgistroSeguridadSocial.vue') },

      { path: 'power-bi-empresas', component: () => import('pages/PowerBi/Empresas.vue') },

      { path: 'cognos', component: () => import('pages/Cognos/Cognos.vue') },

      { path: 'trabajador', component: () => import('pages/Trabajador/Index.vue') },

      { path: 'senec', component: () => import('pages/senec/Index.vue') },
      { path: 'senec/new', component: () => import('pages/senec/New.vue') },
      { path: 'senec/:id', component: () => import('pages/senec/Edit.vue') }

    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
