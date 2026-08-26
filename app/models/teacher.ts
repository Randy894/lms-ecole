import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import TeachingAssignment from '#models/teaching_assignment'
import Course from '#models/course'
import Assignment from '#models/assignment'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare employeeNumber: string

  @column()
  declare specialization: string | null

  @column.date()
  declare hireDate: DateTime | null

  @column()
  declare status: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => TeachingAssignment)
  declare teachingAssignments: HasMany<typeof TeachingAssignment>

  @hasMany(() => Course)
  declare courses: HasMany<typeof Course>

  @hasMany(() => Assignment)
  declare assignments: HasMany<typeof Assignment>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
