import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import TeachingAssignment from '#models/teaching_assignment'
import Course from '#models/course'
import Assignment from '#models/assignment'

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare code: string

  @column()
  declare description: string | null

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
