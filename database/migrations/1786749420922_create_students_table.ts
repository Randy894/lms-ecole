// database/migrations/xxxx_create_students_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('student_number').notNullable().unique()
      table.date('date_of_birth').nullable()
      table.string('gender').nullable()
      table.string('address').nullable()
      table.date('enrollment_date').nullable()
      table.string('status').defaultTo('active')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
