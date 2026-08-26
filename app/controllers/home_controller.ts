import type { HttpContext } from '@adonisjs/core/http'
import School from '#models/school'

export default class HomeController {
  async index({ view }: HttpContext) {
    const school = await School.first()
    return view.render('pages/home', { school })
  }

  async about({ view }: HttpContext) {
    const school = await School.first()
    return view.render('pages/about', { school })
  }

  async gallery({ view }: HttpContext) {
    return view.render('pages/gallery')
  }

  async activities({ view }: HttpContext) {
    return view.render('pages/activities')
  }
}
