import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.login.create': { paramsTuple?: []; params?: {} }
    'auth.login.store': { paramsTuple?: []; params?: {} }
    'auth.signup.create': { paramsTuple?: []; params?: {} }
    'auth.signup.store': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'teacher.dashboard': { paramsTuple?: []; params?: {} }
    'teacher.courses': { paramsTuple?: []; params?: {} }
    'teacher.courses.store': { paramsTuple?: []; params?: {} }
    'teacher.assignments': { paramsTuple?: []; params?: {} }
    'teacher.assignments.store': { paramsTuple?: []; params?: {} }
    'teacher.grades': { paramsTuple?: []; params?: {} }
    'teacher.grades.store': { paramsTuple?: []; params?: {} }
    'teacher.assessment.store': { paramsTuple?: []; params?: {} }
    'teacher.attendances': { paramsTuple?: []; params?: {} }
    'teacher.attendances.store': { paramsTuple?: []; params?: {} }
    'student.dashboard': { paramsTuple?: []; params?: {} }
    'student.grades': { paramsTuple?: []; params?: {} }
    'student.assignments': { paramsTuple?: []; params?: {} }
    'student.courses': { paramsTuple?: []; params?: {} }
    'student.schedule': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.users': { paramsTuple?: []; params?: {} }
    'admin.classes': { paramsTuple?: []; params?: {} }
    'admin.classes.store': { paramsTuple?: []; params?: {} }
    'admin.enrollments': { paramsTuple?: []; params?: {} }
    'admin.enrollments.store': { paramsTuple?: []; params?: {} }
    'admin.assignments': { paramsTuple?: []; params?: {} }
    'admin.assignments.store': { paramsTuple?: []; params?: {} }
    'director.dashboard': { paramsTuple?: []; params?: {} }
    'director.teachers': { paramsTuple?: []; params?: {} }
    'director.students': { paramsTuple?: []; params?: {} }
    'director.reports': { paramsTuple?: []; params?: {} }
    'prefet.dashboard': { paramsTuple?: []; params?: {} }
    'prefet.teachers': { paramsTuple?: []; params?: {} }
    'prefet.students': { paramsTuple?: []; params?: {} }
    'prefet.reports': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.login.create': { paramsTuple?: []; params?: {} }
    'auth.signup.create': { paramsTuple?: []; params?: {} }
    'teacher.dashboard': { paramsTuple?: []; params?: {} }
    'teacher.courses': { paramsTuple?: []; params?: {} }
    'teacher.assignments': { paramsTuple?: []; params?: {} }
    'teacher.grades': { paramsTuple?: []; params?: {} }
    'teacher.attendances': { paramsTuple?: []; params?: {} }
    'student.dashboard': { paramsTuple?: []; params?: {} }
    'student.grades': { paramsTuple?: []; params?: {} }
    'student.assignments': { paramsTuple?: []; params?: {} }
    'student.courses': { paramsTuple?: []; params?: {} }
    'student.schedule': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.users': { paramsTuple?: []; params?: {} }
    'admin.classes': { paramsTuple?: []; params?: {} }
    'admin.enrollments': { paramsTuple?: []; params?: {} }
    'admin.assignments': { paramsTuple?: []; params?: {} }
    'director.dashboard': { paramsTuple?: []; params?: {} }
    'director.teachers': { paramsTuple?: []; params?: {} }
    'director.students': { paramsTuple?: []; params?: {} }
    'director.reports': { paramsTuple?: []; params?: {} }
    'prefet.dashboard': { paramsTuple?: []; params?: {} }
    'prefet.teachers': { paramsTuple?: []; params?: {} }
    'prefet.students': { paramsTuple?: []; params?: {} }
    'prefet.reports': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.login.create': { paramsTuple?: []; params?: {} }
    'auth.signup.create': { paramsTuple?: []; params?: {} }
    'teacher.dashboard': { paramsTuple?: []; params?: {} }
    'teacher.courses': { paramsTuple?: []; params?: {} }
    'teacher.assignments': { paramsTuple?: []; params?: {} }
    'teacher.grades': { paramsTuple?: []; params?: {} }
    'teacher.attendances': { paramsTuple?: []; params?: {} }
    'student.dashboard': { paramsTuple?: []; params?: {} }
    'student.grades': { paramsTuple?: []; params?: {} }
    'student.assignments': { paramsTuple?: []; params?: {} }
    'student.courses': { paramsTuple?: []; params?: {} }
    'student.schedule': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.users': { paramsTuple?: []; params?: {} }
    'admin.classes': { paramsTuple?: []; params?: {} }
    'admin.enrollments': { paramsTuple?: []; params?: {} }
    'admin.assignments': { paramsTuple?: []; params?: {} }
    'director.dashboard': { paramsTuple?: []; params?: {} }
    'director.teachers': { paramsTuple?: []; params?: {} }
    'director.students': { paramsTuple?: []; params?: {} }
    'director.reports': { paramsTuple?: []; params?: {} }
    'prefet.dashboard': { paramsTuple?: []; params?: {} }
    'prefet.teachers': { paramsTuple?: []; params?: {} }
    'prefet.students': { paramsTuple?: []; params?: {} }
    'prefet.reports': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login.store': { paramsTuple?: []; params?: {} }
    'auth.signup.store': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'teacher.courses.store': { paramsTuple?: []; params?: {} }
    'teacher.assignments.store': { paramsTuple?: []; params?: {} }
    'teacher.grades.store': { paramsTuple?: []; params?: {} }
    'teacher.assessment.store': { paramsTuple?: []; params?: {} }
    'teacher.attendances.store': { paramsTuple?: []; params?: {} }
    'admin.classes.store': { paramsTuple?: []; params?: {} }
    'admin.enrollments.store': { paramsTuple?: []; params?: {} }
    'admin.assignments.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}