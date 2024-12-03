import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'allocations'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('server_id').references('servers.id').onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('server_id')
    })
  }
}
