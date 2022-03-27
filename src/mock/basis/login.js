let Login = {
  "code": 0,
  "success": true
}

let UserInfo = {
  "code": 0,
  "success": true,
  "data": {
    userInfo: {
      username: 'admin',
      depart: 'Software'
    },
    roles: ['admin', 'viewer']
  }
}

let AccessPermissions = [
  {
    path: '/setting',
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
    path: '/about',
    component: 'layout',
    children: [
      {
        path: 'about',
        name: 'about',
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
   * 基础 - 获取权限|页面
   * @param： {}    
   * @returns：Promise {<pending>}
   **/
  'post|getPermissionsByUser': option => {
    const params = JSON.parse(option['body']);
    if (params['roles'].indexOf('admin') > -1) {
      return AccessPermissions
    }else {
      return {
        "code": 500,
        "success": false,
        "msg": '权限获取失败'
      }
    }
  },
  'post|getUserInfo': option => {
    const params = JSON.parse(option['body']);
    if (params['username'] === 'admin') {
      return UserInfo
    }else {
      return {
        "code": 500,
        "success": false,
        "msg": '用户信息获取失败'
      }
    }
  }
}