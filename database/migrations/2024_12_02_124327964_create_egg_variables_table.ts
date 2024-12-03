import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'egg_variables'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('egg_id').unsigned().notNullable().references('eggs.id').onDelete('CASCADE')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('env_variable').notNullable()
      table.text('default_value').notNullable()
      table.boolean('user_viewable').notNullable()
      table.boolean('user_editable').notNullable()
      table.text('rules')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
