import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Directeur Principal',
        email: 'directeur@ecole.com',
        password: 'password123',
        role: 'directeur',
      },
      {
        fullName: 'Prefet des Etudes',
        email: 'prefet@ecole.com',
        password: 'password123',
        role: 'prefet',
      },
      {
        fullName: 'Professeur de Math',
        email: 'enseignant@ecole.com',
        password: 'password123',
        role: 'enseignant',
      },
      {
        fullName: 'Eleve Test',
        email: 'eleve@ecole.com',
        password: 'password123',
        role: 'eleve',
      },
    ])
  }
}
