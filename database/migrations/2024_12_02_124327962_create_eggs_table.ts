import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'eggs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').notNullable().unique()
      table.integer('nest_id').unsigned().notNullable().references('nests.id').onDelete('CASCADE')
      table.string('author').notNullable()
      table.string('name').notNullable()
      table.text('description')
      table.text('features', 'longtext')
      table.text('docker_images', 'longtext')
      table.text('file_denylist', 'longtext')
      table.text('update_url')
      table.text('config_files')
      table.text('config_startup')
      table.text('config_logs')
      table.string('config_stop')
      table.integer('config_from').unsigned().references('eggs.id').onDelete('SET NULL')
      table.text('startup')
      table.string('script_container').notNullable().defaultTo('alpine:3.4')
      table.integer('copy_script_from').unsigned().references('eggs.id').onDelete('SET NULL')
      table.string('script_entry').notNullable().defaultTo('ash')
      table.boolean('script_is_privileged').notNullable().defaultTo(true)
      table.text('script_install')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.boolean('force_outgoing_ip').notNullable().defaultTo(false)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
