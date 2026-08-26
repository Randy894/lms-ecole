import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    // Vérifie l'existence de chaque colonne pour éviter les doublons
    const hasFirstName = await this.schema.hasColumn(this.tableName, 'first_name')
    const hasLastName = await this.schema.hasColumn(this.tableName, 'last_name')
    const hasRole = await this.schema.hasColumn(this.tableName, 'role')
    const hasPhone = await this.schema.hasColumn(this.tableName, 'phone')
    const hasAvatar = await this.schema.hasColumn(this.tableName, 'avatar')
    const hasIsActive = await this.schema.hasColumn(this.tableName, 'is_active')

    this.schema.alterTable(this.tableName, (table) => {
      if (!hasFirstName) table.string('first_name').notNullable().defaultTo('')
      if (!hasLastName) table.string('last_name').notNullable().defaultTo('')
      if (!hasRole)
        table
          .enum('role', ['director', 'prefect', 'teacher', 'student'])
          .notNullable()
          .defaultTo('student')
      if (!hasPhone) table.string('phone').nullable()
      if (!hasAvatar) table.string('avatar').nullable()
      if (!hasIsActive) table.boolean('is_active').defaultTo(true)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('first_name', 'last_name', 'role', 'phone', 'avatar', 'is_active')
    })
  }
}
