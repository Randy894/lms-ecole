import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'evaluations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Titre de l'évaluation (ex: "Interrogation 1", "Examen de fin de trimestre")
      table.string('title').notNullable()

      // Description ou matière évaluée (optionnel)
      table.text('description').nullable()

      // Le total maximum de points (ex: sur 20, sur 10, sur 100)
      table.decimal('max_score', 5, 2).notNullable().defaultTo(20.0)

      // Lien avec le cours concerné
      table.integer('course_id').unsigned().references('id').inTable('courses').onDelete('CASCADE')

      // Date de l'évaluation
      table.timestamp('evaluation_date').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
