import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Teacher from '#models/teacher'
import SchoolClass from '#models/school_class'
import Grade from '#models/grade'

export default class DirectorController {
  async dashboard({ view }: HttpContext) {
    const studentsCount = await Student.query().count('* as total')
    const teachersCount = await Teacher.query().count('* as total')
    const classesCount = await SchoolClass.query().count('* as total')

    const stats = {
      students: studentsCount[0].$extras.total,
      teachers: teachersCount[0].$extras.total,
      classes: classesCount[0].$extras.total,
    }

    return view.render('pages/director/dashboard', { stats })
  }

  async teachers({ view }: HttpContext) {
    const teachers = await Teacher.query()
      .preload('user')
      .preload('assignments', (q) => {
        q.preload('schoolClass').preload('subject')
      })

    return view.render('pages/director/teachers', { teachers })
  }

  async students({ view }: HttpContext) {
    const students = await Student.query()
      .preload('user')
      .preload('enrollments', (q) => {
        q.preload('schoolClass')
      })

    return view.render('pages/director/students', { students })
  }

  async reports({ view }: HttpContext) {
    const grades = await Grade.query()
      .preload('student', (q) => q.preload('user'))
      .preload('assessment', (q) => q.preload('subject'))
      .limit(30)

    return view.render('pages/director/reports', { grades })
  }
}
