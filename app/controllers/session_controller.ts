import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class SessionController {
  async create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { uid, password } = request.only(['uid', 'password'])
    console.log("🔍 Tentative de connexion avec l'identifiant (uid) :", uid)

    try {
      // 1. Recherche explicite de l'utilisateur par son email
      const user = await User.findBy('email', uid)

      if (!user) {
        console.log("❌ Aucun utilisateur trouvé en base pour l'email :", uid)
        session.flash('auth.errors', 'Identifiants ou mot de passe incorrect.')
        return response.redirect().back()
      }

      console.log('✅ Utilisateur trouvé en base :', user.email, '| Rôle :', user.role)

      // 2. Vérification manuelle du hachage du mot de passe
      const isPasswordValid = await hash.verify(user.password, password)
      console.log('🔐 Résultat de la vérification du mot de passe (true/false) :', isPasswordValid)

      if (!isPasswordValid) {
        console.log('❌ Le mot de passe saisi ne correspond pas au hachage en base pour :', uid)
        session.flash('auth.errors', 'Identifiants ou mot de passe incorrect.')
        return response.redirect().back()
      }

      // 3. Connexion de l'utilisateur
      await auth.use('web').login(user)
      console.log('🎉 Connexion réussie et session ouverte pour :', user.email)

      // 4. Redirection selon le rôle
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
      console.error('🔥 ERREUR CRITIQUE DE CONNEXION :', error)
      session.flash('auth.errors', 'Une erreur est survenue.')
      return response.redirect().back()
    }
  }

  async destroy({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toPath('/login')
  }
}
