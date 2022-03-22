let Login = {
  "code": 0,
  "success": true,
  "data": {
    roles: ['admin', 'viewer']
  }
}

let AccessPermissions = [
  {
    path: '/setting',
    component: () => import('@/layout'),
    meta: { title: 'setting', icon: 'yiconsetting1' },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/system/Profile'),
        meta: { title: 'profile' }
      },
      {
        path: 'selfSetting',
        name: 'selfSetting',
        component: () => import('@/views/system/SettingsPage'),
        meta: { title: 'selfSetting' }
      }
    ]
  },
]

export default {

  /**
   * 基础 - 登录
   * @param： {}    
   * @returns：Promise {<pending>}
   **/
  'post|login': option => {
    const params = JSON.parse(option['body']);
    if (params['username'] === 'admin' && params['password'] === '123456') {
      return Login
    }else {
      return {
        "code": 500,
        "success": false,
        "msg": '账号或者密码错误'
      }
    }
  },
  /**
   * 基础 - 登录
   * @param： {}    
   * @returns：Promise {<pending>}
   **/
  'post|getPermissions': option => {
    const params = JSON.parse(option['body']);
    if (params['username'] === 'admin') {
      return AccessPermissions
    }else {
      return {
        "code": 500,
        "success": false,
        "msg": '账号或者密码错误'
      }
    }
  }
}