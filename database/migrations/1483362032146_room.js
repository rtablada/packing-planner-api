'use strict';

const Schema = use('Schema');

class RoomSchema extends Schema {

  up() {
    this.create('rooms', (table) => {
      table.increments();
      table.string('name')
        .unique()
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('rooms');
  }

}

module.exports = RoomSchema;
