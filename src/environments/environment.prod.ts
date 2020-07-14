const serverUrl = 'http://smartacademy.specialnext.com/elearning/api/v1/'
export const environment = {
  production: true,
  _loginAPI: `${serverUrl}auth/login`,
  _signUp: `${serverUrl}auth/signup`,
  _refreshToken : `${serverUrl}auth/refresh/token`
}