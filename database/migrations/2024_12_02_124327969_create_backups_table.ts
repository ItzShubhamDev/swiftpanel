import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'backups'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('server_id')
        .unsigned()
        .notNullable()
        .references('servers.id')
        .onDelete('CASCADE')
      table.uuid('uuid').notNullable().unique()
      table.text('upload_id')
      table.boolean('is_successful').notNullable().defaultTo(false)
      table.boolean('is_locked').notNullable().defaultTo(false)
      table.string('name').notNullable()
      table.text('ignored_files').notNullable()
      table.string('disk').notNullable()
      table.string('checksum')
      table.integer('bytes').unsigned().notNullable().defaultTo(0)
      table.timestamp('completed_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
