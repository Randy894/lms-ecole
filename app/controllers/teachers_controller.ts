import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Teacher from '#models/teacher'
import SchoolClass from '#models/school_class'
import Subject from '#models/subject'
import TeachingAssignment from '#models/teaching_assignment'
import Course from '#models/course'
import Assignment from '#models/assignment'
import Assessment from '#models/assessment'
import Grade from '#models/grade'
import Attendance from '#models/attendance'
import Student from '#models/student'

export default class TeachersController {
  private async getOrCreateTeacher() {
    let teacher = await Teacher.first()
    if (!teacher) {
      let user = await User.first()
      if (!user) {
        user = await User.create({
          fullName: 'Professeur Test',
          email: 'prof@gsm.com',
          password: 'password123',
          role: 'enseignant',
        })
      }
      teacher = await Teacher.create({
        userId: user.id,
        employeeNumber: 'EMP-001',
        status: 'active',
      })
    }
    return teacher
  }

  async dashboard({ view }: HttpContext) {
    const teacher = await this.getOrCreateTeacher()
    const assignments = await TeachingAssignment.query()
      .where('teacherId', teacher.id)
      .preload('schoolClass')
      .preload('subject')

    return view.render('pages/teacher/dashboard', { teacher, assignments })
  }

  async courses({ view }: HttpContext) {
    const teacher = await this.getOrCreateTeacher()

    // 1. Récupérer les cours déjà créés par ce professeur
    const courses = await Course.query()
      .where('teacherId', teacher.id)
      .preload('schoolClass')
      .preload('subject')

    // 2. Récupérer les classes (et en créer une par défaut si la table est vide)
    let schoolClasses = await SchoolClass.all()
    if (schoolClasses.length === 0) {
      await SchoolClass.create({ name: '6ème Secondaire' })
      schoolClasses = await SchoolClass.all()
    }

    // 3. Récupérer les matières (et en créer une par défaut si la table est vide)
    let subjects = await Subject.all()
    if (subjects.length === 0) {
      await Subject.create({ name: 'Mathématiques' })
      subjects = await Subject.all()
    }

    return view.render('pages/teacher/courses', { courses, schoolClasses, subjects })
  }

  async storeCourse({ request, response, session }: HttpContext) {
    const teacher = await this.getOrCreateTeacher()

    const title = request.input('title')
    const description = request.input('description')
    const content = request.input('content')
    const classId = request.input('classId')
    const subjectId = request.input('subjectId')

    if (!classId || !subjectId) {
      session.flash('error', 'Veuillez sélectionner une classe et une matière.')
      return response.redirect().back()
    }

    await Course.create({
      title,
      description,
      content,
      teacherId: teacher.id,
      classId: Number(classId),
      subjectId: Number(subjectId),
    })

    session.flash('success', 'Cours enregistré avec succès !')
    return response.redirect().back()
  }

  async assignments({ view }: HttpContext) {
    const teacher = await this.getOrCreateTeacher()

    // 1. Récupérer les devoirs avec les relations préchargées (pour afficher les noms et non les ID)
    const assignments = await Assignment.query()
      .where('teacherId', teacher.id)
      .preload('schoolClass')
      .preload('subject')

    // 2. Récupérer toutes les classes et matières pour les menus déroulants
    let schoolClasses = await SchoolClass.all()
    if (schoolClasses.length === 0) {
      await SchoolClass.create({ name: '6ème Secondaire' })
      schoolClasses = await SchoolClass.all()
    }

    let subjects = await Subject.all()
    if (subjects.length === 0) {
      await Subject.create({ name: 'Mathématiques', code: 'MATH' })
      subjects = await Subject.all()
    }

    return view.render('pages/teacher/assignments', { assignments, schoolClasses, subjects })
  }

  async storeAssignment({ request, response, session }: HttpContext) {
    const teacher = await this.getOrCreateTeacher()

    const data = request.only([
      'title',
      'description',
      'instructions',
      'subjectId',
      'classId',
      'section',
      'option',
      'dueDate',
      'maxScore',
      'type',
    ])

    // 1. Validation de base des champs obligatoires
    if (!data.classId || !data.subjectId || !data.section) {
      session.flash(
        'error',
        'Veuillez remplir tous les champs obligatoires (Classe, Matière, Section).'
      )
      return response.redirect().back()
    }

    // 2. Vérification de l'existence réelle de la classe en base (Évite l'erreur de clé étrangère)
    const schoolClass = await SchoolClass.find(data.classId)
    if (!schoolClass) {
      session.flash('error', 'La classe sélectionnée est invalide.')
      return response.redirect().back()
    }

    // 3. Vérification de l'existence réelle de la matière en base
    const subject = await Subject.find(data.subjectId)
    if (!subject) {
      session.flash('error', 'La matière sélectionnée est invalide.')
      return response.redirect().back()
    }

    // 4. Création sécurisée
    await Assignment.create({
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      teacherId: teacher.id,
      classId: Number(data.classId),
      subjectId: Number(data.subjectId),
      section: data.section,
      option: data.option || 'toutes',
      dueDate: data.dueDate,
      maxScore: Number(data.maxScore) || 20,
      type: data.type || 'devoir',
      status: 'published',
    })

    session.flash('success', 'Travail publié avec succès !')
    return response.redirect().back()
  }

  async grades({ request, view }: HttpContext) {
    const teacher = await this.getOrCreateTeacher()

    // 1. Récupérer les évaluations existantes
    const assessments = await Assessment.query()
      .where('teacherId', teacher.id)
      .preload('subject')
      .preload('schoolClass')

    // 2. Récupérer toutes les classes réelles (avec création par défaut si vide)
    let schoolClasses = await SchoolClass.all()
    if (schoolClasses.length === 0) {
      await SchoolClass.create({ name: '6ème Secondaire' })
      schoolClasses = await SchoolClass.all()
    }

    // 3. Récupérer toutes les matières réelles (avec création par défaut si vide)
    let subjects = await Subject.all()
    if (subjects.length === 0) {
      await Subject.create({ name: 'Mathématiques', code: 'MATH' })
      subjects = await Subject.all()
    }

    const assessmentId = request.input('assessmentId')
    let selectedAssessment: Assessment | null = null

    let students: Student[] = []
    let existingGrades: Record<number, Grade> = {}

    if (assessmentId) {
      selectedAssessment = await Assessment.query()
        .where('id', assessmentId)
        .preload('schoolClass')
        .first()
      if (selectedAssessment) {
        students = await Student.query()
          .where('classId', selectedAssessment.classId)
          .preload('user')
        const gradesList = await Grade.query().where('assessmentId', assessmentId)
        for (const g of gradesList) {
          existingGrades[g.studentId] = g
        }
      }
    }

    return view.render('pages/teacher/grades', {
      assessments,
      schoolClasses,
      subjects,
      selectedAssessment,
      students,
      existingGrades,
      assessmentId,
    })
  }

  async storeAssessment({ request, response, session }: HttpContext) {
    const teacher = await this.getOrCreateTeacher()

    // 1. Récupération des données du formulaire
    const data = request.only(['title', 'description', 'maxScore', 'subjectId', 'classId'])

    // 2. Création de l'évaluation avec conversion explicite des types
    await Assessment.create({
      title: data.title,
      description: data.description || null,
      maxScore: Number(data.maxScore),
      subjectId: Number(data.subjectId),
      classId: Number(data.classId),
      teacherId: teacher.id,
    })

    if (session) {
      session.flash('success', 'Évaluation créée avec succès !')
    }

    return response.redirect().back()
  }

  async storeGrade({ request, response, session }: HttpContext) {
    const { assessmentId, grades } = request.all()

    if (grades && assessmentId) {
      const parsedAssessmentId = Number(assessmentId)

      for (const studentId in grades) {
        const score = grades[studentId].score
        const comment = grades[studentId].comment

        // On n'enregistre que si le champ de la note n'est pas vide
        if (score !== '' && score !== undefined && score !== null) {
          await Grade.updateOrCreate(
            {
              assessmentId: parsedAssessmentId,
              studentId: Number(studentId),
            },
            {
              score: Number(score),
              comment: comment || null,
            }
          )
        }
      }
    }

    if (session) {
      session.flash('success', 'Notes enregistrées avec succès !')
    }

    return response.redirect().back()
  }

  async attendances({ request, view }: HttpContext) {
    const teacher = await this.getOrCreateTeacher()
    const teachingAssignments = await TeachingAssignment.query()
      .where('teacherId', teacher.id)
      .preload('schoolClass')

    const classId = request.input('classId')
    const date = request.input('date') || new Date().toISOString().split('T')[0]

    let students: Student[] = []
    let existingAttendances: Record<number, Attendance> = {}

    if (classId) {
      students = await Student.query().where('classId', classId).preload('user')
      const attendancesList = await Attendance.query().where('classId', classId).where('date', date)
      for (const att of attendancesList) {
        existingAttendances[att.studentId] = att
      }
    }

    return view.render('pages/teacher/attendances', {
      teachingAssignments,
      students,
      classId,
      date,
      existingAttendances,
    })
  }

  async storeAttendance({ request, response }: HttpContext) {
    const { classId, date, attendance } = request.all()
    if (attendance) {
      for (const studentId in attendance) {
        const item = attendance[studentId]
        await Attendance.updateOrCreate(
          { studentId: Number(studentId), classId: Number(classId), date },
          {
            status: item.status || 'present',
            justification: item.justification === 'on' || item.justification === true,
            comment: item.comment,
          }
        )
      }
    }
    return response.redirect().back()
  }
}
