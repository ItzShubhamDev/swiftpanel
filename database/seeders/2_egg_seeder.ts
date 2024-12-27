import Nest from '#models/nest'
import { getEggs } from '#utils/seeders/index'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class EggSeeder extends BaseSeeder {
  async run() {
    const eggs = await getEggs()
    for (const nest of eggs) {
      const n = await Nest.query()
        .where('name', nest.name)
        .andWhere('author', 'support@pterodactyl.io')
        .first()
      if (!n) {
        return
      }
      for (const eggData of nest.eggs) {
        const { eggVariables, ...egg } = eggData
        const e = await n.related('eggs').updateOrCreate({ name: egg.name }, egg)
        await e.related('eggVariables').updateOrCreateMany(eggVariables, 'name')
      }
    }
  }
}
