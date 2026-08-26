import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne, beforeSave } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Student from '#models/student'
import Teacher from '#models/teacher'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'))

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'directeur' | 'prefect' | 'enseignant' | 'eleve'

  @column()
  declare phone: string | null

  @column()
  declare avatar: string | null

  @column()
  declare isActive: boolean

  @hasOne(() => Student)
  declare student: HasOne<typeof Student>

  @hasOne(() => Teacher)
  declare teacher: HasOne<typeof Teacher>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Utilisation explicite du même driver 'scrypt' pour le hachage et le typage User
  @beforeSave()
  static async hashPassword(user: any) {
    if (user.$dirty.password) {
      user.password = await hash.use('scrypt').make(user.password)
    }
  }
}
