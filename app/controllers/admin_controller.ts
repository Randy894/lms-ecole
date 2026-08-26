import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import SchoolClass from '#models/school_class'
import TeachingAssignment from '#models/teaching_assignment'
import Teacher from '#models/teacher'
import Subject from '#models/subject'
import Student from '#models/student'
import Enrollment from '#models/enrollment'

export default class AdminController {
  async dashboard({ view }: HttpContext) {
    const usersCount = await User.query().count('* as total')
    const studentsCount = await Student.query().count('* as total')
    const teachersCount = await Teacher.query().count('* as total')
    const classesCount = await SchoolClass.query().count('* as total')
    const assignmentsCount = await TeachingAssignment.query().count('* as total')
    const enrollmentsCount = await Enrollment.query().count('* as total')

    return view.render('pages/admin/dashboard', {
      stats: {
        users: usersCount[0].$extras.total,
        students: studentsCount[0].$extras.total,
        teachers: teachersCount[0].$extras.total,
        classes: classesCount[0].$extras.total,
        assignments: assignmentsCount[0].$extras.total,
        enrollments: enrollmentsCount[0].$extras.total,
      },
    })
  }

  async users({ view }: HttpContext) {
    const users = await User.all()
    return view.render('pages/admin/users', { users })
  }

  async classes({ view }: HttpContext) {
    const classes = await SchoolClass.all()
    return view.render('pages/admin/classes', { classes })
  }

  async storeClass({ request, response }: HttpContext) {
    const name = request.input('name')
    if (name) {
      await SchoolClass.create({ name })
    }
    return response.redirect().back()
  }

  async enrollments({ view }: HttpContext) {
    const enrollments = await Enrollment.query()
      .preload('student', (q) => q.preload('user'))
      .preload('schoolClass')

    const students = await Student.query().preload('user')
    const classes = await SchoolClass.all()

    return view.render('pages/admin/enrollments', { enrollments, students, classes })
  }

  async storeEnrollment({ request, response }: HttpContext) {
    const studentId = request.input('studentId')
    const classId = request.input('classId')

    if (studentId && classId) {
      await Enrollment.create({
        studentId: Number(studentId),
        classId: Number(classId),
        academicYearId: 1,
        status: 'active',
        enrollmentDate: DateTime.now(),
      })
    }

    return response.redirect().back()
  }

  async assignments({ view }: HttpContext) {
    const assignments = await TeachingAssignment.query()
      .preload('teacher', (q) => q.preload('user'))
      .preload('schoolClass')
      .preload('subject')

    const teachers = await Teacher.query().preload('user')
    const classes = await SchoolClass.all()
    const subjects = await Subject.all()

    return view.render('pages/admin/assignments', { assignments, teachers, classes, subjects })
  }

  async storeAssignment({ request, response }: HttpContext) {
    const data = request.only(['teacherId', 'classId', 'subjectId', 'academicYear'])
    await TeachingAssignment.create(data)
    return response.redirect().back()
  }
}
