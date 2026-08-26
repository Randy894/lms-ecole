import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const AdminController = () => import('#controllers/admin_controller')
const DirectorController = () => import('#controllers/director_controller')

// Page d'accueil du portail (passerelle vers l'authentification)
router.on('/').render('pages/home').as('home')

// Routes d'authentification
router.get('login', [AuthController, 'showLogin']).as('auth.login.create').use(middleware.guest())
router.post('login', [AuthController, 'login']).as('auth.login.store').use(middleware.guest())

router
  .get('signup', [AuthController, 'showRegister'])
  .as('auth.signup.create')
  .use(middleware.guest())
router.post('signup', [AuthController, 'register']).as('auth.signup.store').use(middleware.guest())

router.post('logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())

// ==========================================
// ESPACE ENSEIGNANT (Utilisation de Teachers)
// ==========================================
router.get('/enseignant/dashboard', [controllers.Teachers, 'dashboard']).as('teacher.dashboard')
router.get('/enseignant/courses', [controllers.Teachers, 'courses']).as('teacher.courses')
router
  .post('/enseignant/courses', [controllers.Teachers, 'storeCourse'])
  .as('teacher.courses.store')
router
  .get('/enseignant/assignments', [controllers.Teachers, 'assignments'])
  .as('teacher.assignments')
router
  .post('/enseignant/assignments', [controllers.Teachers, 'storeAssignment'])
  .as('teacher.assignments.store')
router.get('/enseignant/grades', [controllers.Teachers, 'grades']).as('teacher.grades')
router.post('/enseignant/grades', [controllers.Teachers, 'storeGrade']).as('teacher.grades.store')
router
  .post('/enseignant/grades/assessment', [controllers.Teachers, 'storeAssessment'])
  .as('teacher.assessment.store')
router
  .get('/enseignant/attendances', [controllers.Teachers, 'attendances'])
  .as('teacher.attendances')
router
  .post('/enseignant/attendances', [controllers.Teachers, 'storeAttendance'])
  .as('teacher.attendances.store')

// ==========================================
// ESPACE ÉLÈVE (Utilisation de Students)
// ==========================================
router.get('/eleve/dashboard', [controllers.Students, 'dashboard']).as('student.dashboard')
router.get('/eleve/grades', [controllers.Students, 'grades']).as('student.grades')
router.get('/eleve/assignments', [controllers.Students, 'assignments']).as('student.assignments')
router.get('/eleve/courses', [controllers.Students, 'courses']).as('student.courses')
router.get('/eleve/schedule', [controllers.Students, 'schedule']).as('student.schedule')

// ==========================================
// ESPACE ADMINISTRATION (Admin Technique)
// ==========================================
router
  .group(() => {
    router.get('/dashboard', [AdminController, 'dashboard']).as('admin.dashboard')
    router.get('/users', [AdminController, 'users']).as('admin.users')
    router.get('/classes', [AdminController, 'classes']).as('admin.classes')
    router.post('/classes', [AdminController, 'storeClass']).as('admin.classes.store')
    router.get('/enrollments', [AdminController, 'enrollments']).as('admin.enrollments')
    router.post('/enrollments', [AdminController, 'storeEnrollment']).as('admin.enrollments.store')
    router.get('/assignments', [AdminController, 'assignments']).as('admin.assignments')
    router.post('/assignments', [AdminController, 'storeAssignment']).as('admin.assignments.store')
  })
  .prefix('/admin')

// ==========================================
// ESPACE DIRECTION (Directeur / Préfet)
// ==========================================
router
  .group(() => {
    router.get('/dashboard', [DirectorController, 'dashboard']).as('director.dashboard')
    router.get('/teachers', [DirectorController, 'teachers']).as('director.teachers')
    router.get('/students', [DirectorController, 'students']).as('director.students')
    router.get('/reports', [DirectorController, 'reports']).as('director.reports')
  })
  .prefix('/directeur')

router
  .group(() => {
    router.get('/dashboard', [DirectorController, 'dashboard']).as('prefet.dashboard')
    router.get('/teachers', [DirectorController, 'teachers']).as('prefet.teachers')
    router.get('/students', [DirectorController, 'students']).as('prefet.students')
    router.get('/reports', [DirectorController, 'reports']).as('prefet.reports')
  })
  .prefix('/prefet')
