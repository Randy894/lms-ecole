import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Teacher from '#models/teacher'
import Subject from '#models/subject'
import SchoolClass from '#models/school_class'
import Submission from '#models/submission'

export default class Assignment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare instructions: string | null

  @column()
  declare teacherId: number

  @column()
  declare type: string

  // 👇 AJOUTEZ CES DEUX LIGNES ICI 👇
  @column()
  declare section: string

  @column()
  declare option: string

  @column()
  declare subjectId: number

  @column()
  declare classId: number

  @column.dateTime()
  declare dueDate: DateTime

  @column()
  declare maxScore: number

  @column()
  declare status: string

  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>

  @belongsTo(() => Subject)
  declare subject: BelongsTo<typeof Subject>

  @belongsTo(() => SchoolClass, { foreignKey: 'classId' })
  declare schoolClass: BelongsTo<typeof SchoolClass>

  @hasMany(() => Submission)
  declare submissions: HasMany<typeof Submission>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
