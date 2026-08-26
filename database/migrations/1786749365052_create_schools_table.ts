// database/migrations/xxxx_create_schools_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'schools'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.text('history').nullable()
      table.text('objectives').nullable()
      table.string('address').nullable()
      table.string('phone').nullable()
      table.string('email').nullable()
      table.string('logo').nullable()
      table.string('website').nullable()
      table.string('facebook').nullable()
      table.string('instagram').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
