// database/migrations/xxxx_create_classes_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'classes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable() // ex: 6ème Scientifique A
      table.integer('level_id').unsigned().references('id').inTable('levels').onDelete('CASCADE')
      table.integer('option_id').unsigned().references('id').inTable('options').onDelete('CASCADE')
      table
        .integer('academic_year_id')
        .unsigned()
        .references('id')
        .inTable('academic_years')
        .onDelete('CASCADE')
      table.integer('prefect_id').unsigned().references('id').inTable('users').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
