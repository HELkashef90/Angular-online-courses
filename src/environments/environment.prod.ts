const serverUrl = 'https://smartacademy.specialnext.com/elearning/api/v1/'
export const environment = {
  production: true,
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
  _getCourseChaptersByCourseIdStudent: `${serverUrl}student-view/course-chapter/`,
  _checkOut: `${serverUrl}enrollment-request/checkout`,
  _forgotPassword: `${serverUrl}auth/forgot-password`,
  _confirmResetPass: `${serverUrl}auth/confirm-reset`,
  _resetReq: `${serverUrl}auth/reset-password`,
  _getEnrollmentStudents: `${serverUrl}enrollment-request/all`,
  _activeEnrollment: `${serverUrl}enrollment-request/activate/`,
  _rejectEnrollment: `${serverUrl}enrollment-request/deactivate/`




}