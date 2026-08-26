import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Student from '#models/student'
import Enrollment from '#models/enrollment'
import SchoolClass from '#models/school_class'
import Grade from '#models/grade'
import Assignment from '#models/assignment'
import Course from '#models/course'

export default class StudentsController {
  private async getOrCreateStudent() {
    let student = await Student.query()
      .preload('user')
      .preload('enrollments', (q) => {
        q.preload('schoolClass')
      })
      .first()

    if (!student) {
      let user = await User.first()
      if (!user) {
        user = await User.create({
          fullName: 'Léonard Lukusa',
          email: 'eleve@gsm.com',
          password: 'password123',
          role: 'eleve',
        })
      }

      let schoolClass = await SchoolClass.first()
      if (!schoolClass) {
        schoolClass = await SchoolClass.create({
          name: '6éme Secondaire',
        })
      }

      student = await Student.create({
        userId: user.id,
        studentNumber: 'ELV-001',
        status: 'active',
      })

      await Enrollment.create({
        studentId: student.id,
        classId: schoolClass.id,
        academicYearId: 1,
        status: 'active',
        enrollmentDate: DateTime.now(),
      })

      await student.load('user')
      await student.load('enrollments', (q) => {
        q.preload('schoolClass')
      })
    } else {
      // S'assurer que l'élève existant a bien une inscription (enrollment)
      if (!student.enrollments || student.enrollments.length === 0) {
        let schoolClass = await SchoolClass.first()
        if (schoolClass) {
          await Enrollment.create({
            studentId: student.id,
            classId: schoolClass.id,
            academicYearId: 1,
            status: 'active',
            enrollmentDate: DateTime.now(),
          })
          await student.load('enrollments', (q) => {
            q.preload('schoolClass')
          })
        }
      }
    }
    return student
  }

  // Récupérer l'ID de la classe active de l'élève
  private getActiveClassId(student: Student): number | null {
    const activeEnrollment = student.enrollments?.[0]
    return activeEnrollment ? activeEnrollment.classId : null
  }

  async dashboard({ view }: HttpContext) {
    const student = await this.getOrCreateStudent()
    const classId = this.getActiveClassId(student)

    const grades = await Grade.query().where('studentId', student.id)
    let total = 0
    for (const g of grades) {
      total += g.score
    }
    const averageGrade = grades.length > 0 ? (total / grades.length).toFixed(1) : '0.0'

    let nextAssignment = null
    if (classId) {
      const assignment = await Assignment.query()
        .where('classId', classId)
        .orderBy('dueDate', 'asc')
        .first()

      if (assignment) {
        nextAssignment = {
          title: assignment.title,
          description: assignment.description || 'Aucune description fournie.',
          dueDate: assignment.dueDate
            ? assignment.dueDate.toFormat('dd/MM/yyyy à HH:mm')
            : 'Non spécifiée',
        }
      }
    }

    const user = {
      fullName: student.user ? student.user.fullName : 'Élève Test',
      averageGrade,
    }

    return view.render('pages/student/dashboard', { user, nextAssignment })
  }

  async grades({ view }: HttpContext) {
    const student = await this.getOrCreateStudent()
    const gradesList = await Grade.query()
      .where('studentId', student.id)
      .preload('assessment', (q) => {
        q.preload('subject')
      })

    const grades = gradesList.map((g) => ({
      subjectName: g.assessment?.subject?.name || 'Matière',
      assessmentTitle: g.assessment?.title || 'Évaluation',
      score: g.score,
      maxScore: g.assessment?.maxScore || 20,
    }))

    return view.render('pages/student/grades', { grades })
  }

  async assignments({ view }: HttpContext) {
    const student = await this.getOrCreateStudent()
    const classId = this.getActiveClassId(student)

    let assignmentsList: Assignment[] = []
    if (classId) {
      // 🎯 Filtrage des devoirs pour cette classe
      assignmentsList = await Assignment.query()
        .where('classId', classId)
        .preload('subject')
        .orderBy('dueDate', 'asc')
    }

    const assignments = assignmentsList.map((a) => ({
      title: a.title,
      description: a.description || 'Aucune description',
      // Formatage de la date incluant l'heure limite fixée par le prof
      dueDate: a.dueDate ? a.dueDate.toFormat('dd/MM/yyyy à HH:mm') : 'À définir',
    }))

    return view.render('pages/student/assignments', { assignments })
  }

  async courses({ view }: HttpContext) {
    const student = await this.getOrCreateStudent()
    const classId = this.getActiveClassId(student)

    let coursesList: Course[] = []
    if (classId) {
      coursesList = await Course.query()
        .where('classId', classId)
        .preload('subject')
        .preload('teacher', (q) => {
          q.preload('user')
        })
    }

    const courses = coursesList.map((c) => ({
      title: c.title,
      description: c.description || 'Aucune description',
      content: c.content || 'Aucun contenu disponible',
      teacherName: c.teacher?.user?.fullName || 'Professeur',
    }))

    return view.render('pages/student/courses', { courses })
  }

  async schedule({ view }: HttpContext) {
    const scheduleSlots = [
      {
        time: '08:00 - 09:30',
        monday: 'Mathématiques',
        tuesday: 'Français',
        wednesday: 'Physique',
        thursday: 'Histoire',
        friday: 'Anglais',
      },
      {
        time: '09:45 - 11:15',
        monday: 'Informatique',
        tuesday: 'Mathématiques',
        wednesday: 'Chimie',
        thursday: 'Géographie',
        friday: 'Philosophie',
      },
      {
        time: '11:30 - 13:00',
        monday: 'Français',
        tuesday: 'Anglais',
        wednesday: 'Biologie',
        thursday: 'Mathématiques',
        friday: 'Éducation Physique',
      },
    ]

    return view.render('pages/student/schedule', { scheduleSlots })
  }
}
