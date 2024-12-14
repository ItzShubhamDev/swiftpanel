import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'api_key_values'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('api_key_id')
        .unsigned()
        .notNullable()
        .references('api_keys.id')
        .onDelete('CASCADE')
      table.string('key').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
