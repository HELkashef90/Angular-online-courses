const serverUrl = 'https://smartacademy.specialnext.com/elearning/api/v1/'
export const environment = {
  production: true,
  _loginAPI: `${serverUrl}auth/login`,
  _signUp: `${serverUrl}auth/signup`,
  _refreshToken : `${serverUrl}auth/refresh/token`,
  _isLoggedIn : `${serverUrl}auth/isLoggedin`
}