import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('key').notNullable().unique()
      table.text('value').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
