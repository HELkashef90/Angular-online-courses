// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const serverUrl = 'https://smartacademy.specialnext.com/elearning/api/v1/'
export const environment = {
  production: false,
  _loginAPI: `${serverUrl}auth/login`,
  _signUp: `${serverUrl}auth/signup`,
  _refreshToken: `${serverUrl}auth/refresh/token`,
  _isLoggedIn: `${serverUrl}auth/isLoggedin`,
  _createCourse: `${serverUrl}course/create`,
  _createChapter: `${serverUrl}course-chapter/create`,
  _getChaptersByCourseId: `${serverUrl}course-chapter/by-course/`,
  _createLecture: `${serverUrl}course-chapter-content/create`,
  _getCourses : `${serverUrl}course/by-instructor`
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
