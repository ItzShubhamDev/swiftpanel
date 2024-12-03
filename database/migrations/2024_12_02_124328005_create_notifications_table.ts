import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()
      table.string('type').notNullable()
      table.string('notifiable_type').notNullable()
      table.integer('notifiable_id').unsigned().notNullable()
      table.text('data').notNullable()
      table.timestamp('read_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['notifiable_id', 'notifiable_type'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
