import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'allocations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('node_id').unsigned().notNullable().references('nodes.id').onDelete('cascade')
      table.string('ip').notNullable()
      table.text('ip_alias')
      table.mediumint('port').unsigned().notNullable()
      table.integer('server_id').unsigned()
      table.string('notes')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['node_id', 'ip', 'port'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
