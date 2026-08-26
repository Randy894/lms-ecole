// database/migrations/xxxx_create_enrollments_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enrollments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('student_id')
        .unsigned()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
      table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('CASCADE')
      table
        .integer('academic_year_id')
        .unsigned()
        .references('id')
        .inTable('academic_years')
        .onDelete('CASCADE')
      table.date('enrollment_date').notNullable()
      table.string('status').defaultTo('active')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
