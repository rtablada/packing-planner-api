'use strict';

const Schema = use('Schema');

class ItemSchema extends Schema {

  up() {
    this.create('items', (table) => {
      table.increments();
      table.integer('trip_id')
        .references('trips.id');
      table.integer('room_id')
        .references('rooms.id');

      table.string('name')
        .notNullable();
      table.boolean('ownBox')
        .default(false)
        .notNullable();

      table.string('room')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('items');
  }

}

module.exports = ItemSchema;
