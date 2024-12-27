import Nest from '#models/nest'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class NestSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'

    await Nest.updateOrCreateMany(uniqueKey, [
      {
        name: 'Minecraft',
        description:
          'Minecraft - the classic game from Mojang. With support for Vanilla MC, Spigot, and many others!',
        author: 'support@pterodactyl.io',
      },
      {
        name: 'Rust',
        description: 'Rust - A game where you must fight to survive.',
        author: 'support@pterodactyl.io',
      },
    ])
  }
}
