import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('queue', 191).notNullable()
      table.text('payload', 'longtext').notNullable()
      table.tinyint('attempts').unsigned().notNullable()
      table.integer('reserved_at').unsigned().nullable()
      table.integer('available_at').unsigned().notNullable()
      table.integer('created_at').unsigned().notNullable()

      table.index(['queue', 'reserved_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
