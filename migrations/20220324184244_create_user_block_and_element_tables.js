exports.up = function(knex) {
    return knex.schema
      .createTable('user', (table) => {
        table.increments('id').primary();
        table.integer('github_id').notNullable();
        table.string('avatar_url', 255).notNullable();
        table.string('username', 255).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer('theme').notNullable().defaultTo(0);
      })
      .createTable('block', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('name', 255 ).notNullable();
        table.string('type', 255 ).notNullable();
        table.string('file_type', 255 ).notNullable();
        table
          .foreign('user_id')
          .references('id')
          .inTable('user')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('element', (table) => {
        table.increments('id').primary();
        table.string('name', 255 ).notNullable();
        table.string('type', 255 ).notNullable();
        table.integer('sort').unsigned().notNullable();
      })
      .createTable('block_element', (table) => {
        table.integer('block_id').unsigned().notNullable();
        table.integer('element_id').unsigned().notNullable();
        table
          .foreign('block_id')
          .references('id')
          .inTable('block')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .foreign('element_id')
          .references('id')
          .inTable('element')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('block_modifier', (table) => {
        table.increments('id').primary();
        table.integer('block_id').unsigned().notNullable();
        table.string('name', 255 ).notNullable();
        table
          .foreign('block_id')
          .references('id')
          .inTable('block')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('element_element', (table) => {
        table.integer('parent_id').unsigned().notNullable();
        table.integer('child_id').unsigned().notNullable();
        table
          .foreign('parent_id')
          .references('id')
          .inTable('element')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .foreign('child_id')
          .references('id')
          .inTable('element')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('element_modifier', (table) => {
        table.increments('id').primary();
        table.integer('element_id').unsigned().notNullable();
        table.string('name', 255 ).notNullable();
        table
          .foreign('element_id')
          .references('id')
          .inTable('element')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('element_modifier')
      .dropTable('block_modifier')
      .dropTable('element_element')
      .dropTable('block_element')
      .dropTable('element')
      .dropTable('block')
      .dropTable('user');
  };