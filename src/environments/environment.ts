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
  _getCourses: `${serverUrl}course/by-instructor`,
  _logOut: `${serverUrl}auth/logout`,
  _getChaptersByInstructor: `${serverUrl}course-chapter/by-instructor`,
  _getLecturesByInstructor: `${serverUrl}course-chapter-content/by-instructor`,
  _deleteCourse: `${serverUrl}course/delete/`,
  _updateCourse: `${serverUrl}course/update`,
  _updateChapter: `${serverUrl}course-chapter/update`,
  _deleteChapter: `${serverUrl}course-chapter/delete/`,
  _deleteLecture: `${serverUrl}course-chapter-content/delete/`,
  _updateLecture: `${serverUrl}course-chapter-content/update`,
  _activeAccount: `${serverUrl}auth/accountVerification/`,
  _getAllApprovedCourses: `${serverUrl}student-view/courses/published`,
  _getCourseById: `${serverUrl}course/`,
  _getCourseChaptersByCourseIdStudent:`${serverUrl}student-view/course-chapter/`,
  _checkOut:`${serverUrl}enrollment-request/checkout`,
  _forgotPassword:`${serverUrl}auth/forgot-password`,
  _confirmResetPass:`${serverUrl}auth/confirm-reset`,
  _resetReq: `${serverUrl}auth/reset-password`
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
