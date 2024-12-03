import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activity_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('batch')
      table.string('event').notNullable().index()
      table.string('ip').notNullable()
      table.text('description')
      table.string('actor_type')
      table.integer('actor_id').unsigned()
      table.integer('api_key_id').unsigned()
      table.text('properties', 'longtext').notNullable()
      table.timestamp('timestamp').notNullable().defaultTo(this.now())

      table.index(['actor_type', 'actor_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
