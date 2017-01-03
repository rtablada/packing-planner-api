'use strict';

const Lucid = use('Lucid');

class Item extends Lucid {


  trip() {
    return this.belongsTo('App/Model/Trip', 'id', 'trip_id');
  }

  room() {
    return this.belongsTo('App/Model/Room', 'id', 'room_id');
  }
}

module.exports = Item;
