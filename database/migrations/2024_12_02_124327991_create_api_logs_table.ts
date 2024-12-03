import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'api_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('authorized').notNullable()
      table.text('error')
      table.uuid('key')
      table.string('method', 6).notNullable()
      table.text('route').notNullable()
      table.text('content')
      table.text('user_agent').notNullable()
      table.string('request_ip', 45).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
