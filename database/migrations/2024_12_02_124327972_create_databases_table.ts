import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'databases'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('server_id').unsigned().notNullable().references('servers.id')
      table.integer('database_host_id').unsigned().notNullable().references('databases_hosts.id')
      table.string('database').notNullable()
      table.string('username').notNullable()
      table.string('remote').notNullable().defaultTo('%')
      table.text('password').notNullable()
      table.integer('max_connections').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['database_host_id', 'username'])
      table.unique(['database_host_id', 'server_id', 'database'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
