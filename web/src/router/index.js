import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/index'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/apigen',
    meta: { title: '开发工具', icon: 'dashboard', affix: true },
    children: [
      /* {
        path: 'apitest',
        component: () => import('@/views/apitest/index'),
        name: 'ApiTest',
        meta: { title: '接口测试', icon: 'dashboard', affix: true }
      },*/
      {
        path: 'apigen',
        component: () => import('@/views/apigen/index'),
        name: 'ApiGen',
        meta: { title: '代码生成', icon: 'dashboard', affix: true }
      },
      {
        path: 'postman',
        component: () => import('@/views/postman/index'),
        name: 'Postman',
        meta: { title: 'postman报告导出', icon: 'dashboard', affix: true }
      },
      {
        path: 'createTable',
        component: () => import('@/views/createTable/index'),
        name: 'CreateTable',
        meta: { title: '建表语句生成', icon: 'dashboard', affix: true }
      },
      {
        path: 'database',
        component: () => import('@/views/database/index'),
        name: 'database',
        meta: { title: '生成数据库文档', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/nation',
    component: Layout,
    redirect: '/nationSys',
    meta: { title: '国家局系统标准', icon: 'dashboard', affix: true },
    children: [
      {
        path: 'fields',
        component: () => import('@/views/fields/index'),
        name: 'Fields',
        meta: { title: '字段命名', icon: 'dashboard', affix: true }
      },
      {
        path: 'dict',
        component: () => import('@/views/dict/index'),
        name: 'Dict',
        meta: { title: '数据字典', icon: 'dashboard', affix: true }
      },
      {
        path: 'http://172.16.18.112:1024/db',
        meta: { title: '子系统&数据库', icon: 'link' }
      }
    ]
  },
  {
    path: '/jc',
    component: Layout,
    redirect: '/jiance',
    meta: { title: '监测', icon: 'dashboard', affix: true },
    children: [
      {
        path: 'servList',
        component: () => import('@/views/servList/index'),
        name: 'ServList',
        meta: { title: '服务部署情况', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/yx',
    component: Layout,
    redirect: '/yuanxing',
    meta: { title: '原型', icon: 'dashboard', affix: true },
    children: [
      {
        path: 'prototype',
        component: () => import('@/views/prototype/index'),
        name: 'prototype',
        meta: { title: '原型上传', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/ims',
    component: Layout,
    redirect: '/ims',
    meta: { title: '智能监管', icon: 'dashboard', affix: true },
    children: [
      {
        path: 'doc',
        component: () => import('@/views/doc/index'),
        name: 'doc',
        meta: { title: '单据存档回档', icon: 'dashboard', affix: true }
      },
      {
        path: 'dataxconfig',
        component: () => import('@/views/dataxconfig/index'),
        name: 'dataxconfig',
        meta: { title: '数据抽取脚本配置', icon: 'dashboard', affix: true }
      }
    ]
  }

  /*

 {
   path: '/',
   component: Layout,
   redirect: '/dashboard',
   children: [
     {
       path: 'dashboard',
       component: () => import('@/views/dashboard/index'),
       name: 'Dashboard',
       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
     }
   ]
 },

 {
   path: '/documentation',
   component: Layout,
   children: [
     {
       path: 'index',
       component: () => import('@/views/documentation/index'),
       name: 'Documentation',
       meta: { title: 'Documentation', icon: 'documentation', affix: true }
     }
   ]
 },
 {
   path: '/guide',
   component: Layout,
   redirect: '/guide/index',
   children: [
     {
       path: 'index',
       component: () => import('@/views/guide/index'),
       name: 'Guide',
       meta: { title: 'Guide', icon: 'guide', noCache: true }
     }
   ]
 },
 {
   path: '/profile',
   component: Layout,
   redirect: '/profile/index',
   hidden: true,
   children: [
     {
       path: 'index',
       component: () => import('@/views/profile/index'),
       name: 'Profile',
       meta: { title: 'Profile', icon: 'user', noCache: true }
     }
   ]
 }
*/
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /*

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },
*/

  {
    path: 'external-link',
    component: Layout,
    meta: { title: '外部工具', icon: 'link' },
    children: [
      {
        path: 'https://www.bejson.com/',
        meta: { title: 'json格式化', icon: 'link' }
      },
      {
        path: 'http://172.16.18.112:5077/',
        meta: { title: 'sql语句评估', icon: 'link' }
      },
      {
        path: 'https://tool.lu/timestamp/',
        meta: { title: '时间戳', icon: 'link' }
      },
      {
        path: 'https://tool.oschina.net/regex',
        meta: { title: '正则表达式', icon: 'link' }
      },
      {
        path: 'http://10.16.0.127:1111',
        meta: { title: '网盘（文档中心）', icon: 'link' }
      }
    ]
  },

  {
    path: '/message-tool',
    component: Layout,
    meta: { title: '规则引擎报文工具', icon: 'link' },
    children: [
      {
        path: 'beforehand',
        component: () => import('@/views/messageTool/beforehand'),
        name: 'Beforehand',
        meta: { title: '事前事中报文' }
      },
      {
        path: 'afterwards',
        component: () => import('@/views/messageTool/afterwards'),
        name: 'Afterwards',
        meta: { title: '事后报文' }
      },
      {
        path: 'outParameter;',
        component: () => import('@/views/messageTool/outParameter'),
        name: 'OutParameter',
        meta: { title: '出参报文' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
