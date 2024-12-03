import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('external_id').index()
      table.uuid('uuid').notNullable().unique()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('name_first')
      table.string('name_last')
      table.text('password').notNullable()
      table.string('remember_token')
      table.string('language', 5).notNullable().defaultTo('en')
      table.boolean('root_admin').notNullable().defaultTo(false)
      table.boolean('use_totp').notNullable()
      table.text('totp_secret')
      table.timestamp('totp_authenticated_at')
      table.tinyint('gravatar').notNullable().defaultTo(1)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
