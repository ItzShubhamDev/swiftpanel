import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'migrations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('migration').notNullable()
      table.integer('batch').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
