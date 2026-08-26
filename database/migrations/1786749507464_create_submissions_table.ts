// database/migrations/xxxx_create_submissions_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'submissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('assignment_id')
        .unsigned()
        .references('id')
        .inTable('assignments')
        .onDelete('CASCADE')
      table
        .integer('student_id')
        .unsigned()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
      table.text('content').nullable()
      table.string('file_url').nullable()
      table.dateTime('submitted_at').defaultTo(this.now())
      table.float('score').nullable()
      table.text('feedback').nullable()
      table.string('status').defaultTo('submitted') // submitted, graded, late
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
