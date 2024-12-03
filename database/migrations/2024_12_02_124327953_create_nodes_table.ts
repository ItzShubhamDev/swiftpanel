import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'nodes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').notNullable().unique()
      table.boolean('public').notNullable()
      table.string('name').notNullable()
      table.text('description')
      table.integer('location_id').unsigned().notNullable().references('locations.id')
      table.string('fqdn').notNullable()
      table.string('scheme').notNullable().defaultTo('https')
      table.boolean('behind_proxy').notNullable().defaultTo(false)
      table.boolean('maintenance_mode').notNullable().defaultTo(false)
      table.integer('memory').unsigned().notNullable()
      table.integer('memory_overallocate').notNullable().defaultTo(0)
      table.integer('disk').unsigned().notNullable()
      table.integer('disk_overallocate').notNullable().defaultTo(0)
      table.integer('upload_size').unsigned().notNullable().defaultTo(100)
      table.string('daemon_token_id', 16).notNullable().unique()
      table.text('daemon_token').notNullable()
      table.integer('daemonListen').unsigned().notNullable().defaultTo(8080)
      table.integer('daemonSFTP').unsigned().notNullable().defaultTo(2022)
      table.string('daemonBase').notNullable().defaultTo('/home/daemon-files')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
