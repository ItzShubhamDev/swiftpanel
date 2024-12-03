import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'failed_jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uuid').unique().nullable()
      table.text('connection').notNullable()
      table.text('queue').notNullable()
      table.text('payload', 'longtext').notNullable()
      table.timestamp('failed_at').notNullable().defaultTo(this.now())
      table.text('exception').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
