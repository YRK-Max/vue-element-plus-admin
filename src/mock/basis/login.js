let Login = {
  "code": 0,
  "success": true,
  "data": {
    roles: ['admin', 'viewer']
  }
}

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
  }
}