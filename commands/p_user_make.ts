import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import vine from '@vinejs/vine'
import User from '#models/user'

const emailValidator = vine.compile(vine.string().email())

export default class PUser extends BaseCommand {
  static commandName = 'p:user:make'
  static description = ' Creates a user on the system via the CLI.'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const admin = await this.prompt.confirm('Administrator: ')
    const email = await this.prompt.ask('Email Address:', {
      validate: async (value) => {
        try {
          await emailValidator.validate(value)
        } catch (error) {
          return error.messages[0].message
        }
        return true
      },
    })
    const username = await this.prompt.ask('Username:', {
      validate: (value) => {
        if (value.length < 3) {
          return 'Username must be at least 3 characters long'
        }
        return true
      },
    })
    const nameFirst = await this.prompt.ask('First Name:', {
      validate: (value) => {
        if (value.length < 2) {
          return 'First name must be at least 2 characters long'
        }
        return true
      },
    })
    const nameLast = await this.prompt.ask('Last Name:', {
      validate: (value) => {
        if (value.length < 2) {
          return 'Last name must be at least 2 characters long'
        }
        return true
      },
    })
    this.logger.log('Password must be at least 8 characters long')
    const password = await this.prompt.secure('Password:', {
      validate: (value) => {
        if (value.length < 8) {
          return 'Password must be at least 8 characters long'
        }
        return true
      },
    })

    try {
      await User.create({
        email,
        username,
        nameFirst,
        nameLast,
        password,
        rootAdmin: admin,
      })
      this.logger.success('User created successfully')
    } catch (error) {
      this.logger.error('Failed to create user')
      this.logger.error(error)
      return
    }
  }
}
