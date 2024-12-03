import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'servers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('external_id').unique()
      table.uuid('uuid').notNullable().unique()
      table.string('uuidShort', 8).notNullable().unique()
      table.integer('node_id').unsigned().notNullable().references('nodes.id')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('status')
      table.boolean('skip_scripts').notNullable().defaultTo(false)
      table.integer('owner_id').unsigned().notNullable()
      table.integer('memory').unsigned().notNullable()
      table.integer('swap').notNullable()
      table.integer('disk').unsigned().notNullable()
      table.integer('io').unsigned().notNullable()
      table.integer('cpu').unsigned().notNullable()
      table.string('threads')
      table.boolean('oom_disabled').notNullable().defaultTo(false)
      table.integer('allocation_id').unsigned().notNullable().unique().references('allocations.id')
      table.integer('nest_id').unsigned().notNullable().references('nests.id')
      table.integer('egg_id').unsigned().notNullable().references('eggs.id')
      table.text('startup').notNullable()
      table.string('image').notNullable()
      table.integer('allocation_limit').unsigned()
      table.integer('database_limit').unsigned().defaultTo(0)
      table.integer('backup_limit').unsigned().notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('installed_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
