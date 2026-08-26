import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Assessment from '#models/assessment'
import Student from '#models/student'

export default class Grade extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare assessmentId: number

  @column()
  declare studentId: number

  @column()
  declare score: number

  @column()
  declare comment: string | null

  @belongsTo(() => Assessment)
  declare assessment: BelongsTo<typeof Assessment>

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
