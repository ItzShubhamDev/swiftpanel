import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import fs from 'node:fs'
import path from 'node:path'
import string from '@adonisjs/core/helpers/string'

export default class PEnvironmentKey extends BaseCommand {
  static commandName = 'p:environment:key'
  static description = 'Generates a key for this application'

  static options: CommandOptions = {}

  async run() {
    const key = string.random(32)

    try {
      const envPath = path.join(path.resolve('./'), '.env')
      const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
      const newLines = lines.map((line) => {
        if (line.startsWith('APP_KEY=')) {
          return `APP_KEY=${key}`
        }
        return line
      })
      fs.writeFileSync(envPath, newLines.join('\n'))
      this.logger.success('Key has been generated and stored in the .env file')
    } catch (error) {
      this.logger.error('Failed to generate key')
    }
  }
}
