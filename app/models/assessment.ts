import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Subject from '#models/subject'
import SchoolClass from '#models/school_class'
import Teacher from '#models/teacher'
import AcademicYear from '#models/academic_year'
import Grade from '#models/grade'

export default class Assessment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare type: string

  @column()
  declare subjectId: number

  @column()
  declare classId: number

  @column()
  declare description: string | null

  @column()
  declare teacherId: number

  @column()
  declare academicYearId: number

  @column.date()
  declare date: DateTime

  @column()
  declare maxScore: number

  @belongsTo(() => Subject)
  declare subject: BelongsTo<typeof Subject>

  @belongsTo(() => SchoolClass, { foreignKey: 'classId' })
  declare schoolClass: BelongsTo<typeof SchoolClass>

  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>

  @belongsTo(() => AcademicYear)
  declare academicYear: BelongsTo<typeof AcademicYear>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
