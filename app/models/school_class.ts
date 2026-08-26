import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Assignment from '#models/assignment'

export default class SchoolClass extends BaseModel {
  // 🎯 Indique à AdonisJS d'utiliser la vraie table "classes" en base de données
  public static table = 'classes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(() => Assignment, { foreignKey: 'classId' })
  declare assignments: HasMany<typeof Assignment>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
