import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class NewAccountController {
  // Affiche la vue d'inscription
  async create({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  // Traite l'inscription
  async store({ request, response, auth, session }: HttpContext) {
    try {
      const signupSchema = vine.compile(
        vine.object({
          role: vine.enum(['eleve', 'enseignant', 'prefect', 'directeur']),
          fullName: vine.string().trim().minLength(3),
          contact: vine.string().trim(),
          password: vine
            .string()
            .minLength(6)
            .confirmed({ confirmationField: 'password_confirmation' }),
          school_year_id: vine.any().optional(), // Accept tout type temporairement pour tester
          classe: vine.string().optional(),
          age: vine.string().optional(),
          section: vine.string().optional(),
          option: vine.string().optional(),
          cours: vine.string().optional(),
          classes_enseignant: vine.string().optional(),
          departement: vine.string().optional(),
        })
      )

      const payload = await request.validateUsing(signupSchema)

      const user = await User.create({
        fullName: payload.fullName,
        email: payload.contact,
        password: payload.password,
        role: payload.role as 'directeur' | 'prefect' | 'enseignant' | 'eleve',
      })

      await auth.use('web').login(user)

      switch (user.role) {
        case 'directeur':
          return response.redirect().toPath('/directeur/dashboard')
        case 'prefect':
          return response.redirect().toPath('/prefet/dashboard')
        case 'enseignant':
          return response.redirect().toPath('/enseignant/dashboard')
        case 'eleve':
        default:
          return response.redirect().toPath('/eleve/dashboard')
      }
    } catch (error) {
      console.error("ERREUR D'INSCRIPTION :", error) // Affiche l'erreur réelle dans le terminal
      session.flash('errors', error.messages || { form: [error.message] })
      return response.redirect().back()
    }
  }
}
