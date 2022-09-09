const Login = {
  'code': 0,
  'success': true
}

const UserInfo = {
  'code': 0,
  'success': true,
  'data': {
    userInfo: {
      username: 'admin',
      depart: 'Software',
      avatarUrl: 'http://cooer.cc/arctimg/20210908/1631111258069.jpeg'
    },
    roles: ['admin', 'viewer']
  }
}

const AccessPermissions = [
  {
    path: '/baseInfo',
    name: 'baseInfo',
    component: 'layout',
    meta: { title: 'baseInfo', icon: 'yiconicon_mergemodel' },
    children: [
      {
        path: 'fab',
        name: 'fab',
        component: 'baseInfo/FabInfo',
        meta: { title: 'FabInfo' }
      },
      {
        path: 'eqp',
        name: 'eqp',
        component: 'baseInfo/EqpInfo',
        meta: { title: 'EqpInfo' }
      },
      {
        path: 'eqpEvent',
        name: 'eqpEvent',
        component: 'baseInfo/EqpEventInfo',
        meta: { title: 'EqpEvent' }
      }
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: 'layout',
    meta: { title: 'setting', icon: 'yiconsetting1' },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: 'system/Profile',
        meta: { title: 'profile' }
      },
      {
        path: 'selfSetting',
        name: 'selfSetting',
        component: 'system/SettingsPage',
        meta: { title: 'selfSetting' }
      }
    ]
  },
  {
    path: '/editor',
    name: 'LayoutEditorLayout',
    component: 'layout',
    redirect: '/editor/editor',
    children: [
      {
        path: 'editor',
        name: 'LayoutEditor',
        component: 'modules/LayoutEditor',
        meta: { title: 'layoutEditor', icon: 'yiconeditor' }
      }
    ]
  },
  {
    path: '/about',
    name: 'AboutLayout',
    component: 'layout',
    redirect: '/about/about',
    children: [
      {
        path: 'about',
        name: 'About',
        component: 'system/About',
        meta: { title: 'about', icon: 'yiconguanyuwomen' }
      }
    ]
  }
]

export default {

  /**
   * 基础 - 登录
   * @param： {}
   * @returns：Promise {<pending>}
   **/
  'post|login': option => {
    const params = JSON.parse(option['body'])
    if (params['username'] === 'admin' && params['password'] === '123456') {
      return Login
    } else {
      return {
        'code': 500,
        'success': false,
        'msg': '账号或者密码错误'
      }
    }
  },
  /**
   * 基础 - 获取权限|页面
   * @param： {}
   * @returns：Promise {<pending>}
   **/
  'post|getPermissionsByUser': option => {
    const params = JSON.parse(option['body'])
    if (params['roles'].indexOf('admin') > -1) {
      return AccessPermissions
    } else {
      return {
        'code': 500,
        'success': false,
        'msg': '权限获取失败'
      }
    }
  },
  'post|getUserInfo': option => {
    const params = JSON.parse(option['body'])
    if (params['username'] === 'admin') {
      return UserInfo
    } else {
      return {
        'code': 500,
        'success': false,
        'msg': '用户信息获取失败'
      }
    }
  }
}
