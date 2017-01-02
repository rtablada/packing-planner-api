'use strict';

const Schema = use('Schema');

class TripSchema extends Schema {

  up() {
    this.create('trips', (table) => {
      table.increments();
      table.integer('order').notNullable();
      table.string('title');
      table.date('complete_date').notNullable();
      table.boolean('help')
        .default(false)
        .notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('trips');
  }

}

module.exports = TripSchema;
