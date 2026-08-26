import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Assignment from '#models/assignment'
import Student from '#models/student'

export default class Submission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare assignmentId: number

  @column()
  declare studentId: number

  @column()
  declare content: string | null

  @column()
  declare fileUrl: string | null

  @column.dateTime()
  declare submittedAt: DateTime

  @column()
  declare score: number | null

  @column()
  declare feedback: string | null

  @column()
  declare status: string

  @belongsTo(() => Assignment)
  declare assignment: BelongsTo<typeof Assignment>

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
