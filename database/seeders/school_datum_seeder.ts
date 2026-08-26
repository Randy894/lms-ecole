import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SchoolClass from '#models/school_class'
import Subject from '#models/subject'

export default class extends BaseSeeder {
  async run() {
    // Créer des classes
    await SchoolClass.createMany([{ name: '6ème Secondaire' }, { name: '5ème Secondaire' }])

    // Créer des matières
    await Subject.createMany([
      { name: 'Mathématiques' },
      { name: 'Français' },
      { name: 'Informatique' },
    ])
  }
}
