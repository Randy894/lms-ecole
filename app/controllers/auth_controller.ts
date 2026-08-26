import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  // Afficher la vue de connexion
  async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  // Traiter la connexion
  async login({ request, response, auth, session }: HttpContext) {
    console.log('--- LA REQUETE LOGIN ARRIVE ---', request.all()) // <--- Ajoutez ceci

    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      console.log('--- UTILISATEUR CONNECTE ---', user.email) // <--- Et ceci

      await auth.use('web').login(user)
      return this.redirectBasedOnRole(user.role, response)
    } catch (error) {
      console.log('--- ERREUR DE CONNEXION ---', error.message) // <--- Et ceci
      session.flash('notification', 'Email ou mot de passe invalide')
      return response.redirect().back()
    }
  }
  // Afficher la vue d'inscription
  async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  // Traiter l'inscription
  async register({ request, response, auth }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'role'])

    // Création de l'utilisateur (le mot de passe est haché automatiquement via un hook ou le modèle)
    const user = await User.create(data)
    await auth.use('web').login(user)

    return this.redirectBasedOnRole(user.role, response)
  }

  // Déconnexion
  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }

  // Fonction utilitaire de redirection selon le rôle
  private redirectBasedOnRole(role: string, response: any) {
    switch (role) {
      case 'admin':
        return response.redirect('/admin/dashboard')
      case 'director':
      case 'prefet':
        return response.redirect('/directeur/dashboard') // ou /prefet/dashboard selon votre choix
      case 'teacher':
      case 'enseignant':
        return response.redirect('/enseignant/dashboard') // <--- Aligné avec /enseignant/...
      case 'student':
      case 'eleve':
      default:
        return response.redirect('/eleve/dashboard') // <--- Aligné avec /eleve/...
    }
  }
}
