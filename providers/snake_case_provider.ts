import type { ApplicationService } from '@adonisjs/core/types'
import { SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm'
import { BaseModel } from '@adonisjs/lucid/orm'

export default class SnakeCaseProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    BaseModel.namingStrategy = new SnakeCaseNamingStrategy()
  }
}
