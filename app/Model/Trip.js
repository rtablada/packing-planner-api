'use strict'

const Lucid = use('Lucid')

class Trip extends Lucid {


  items() {
    return this.hasMany('App/Model/Item', 'id', 'trip_id');
  }
}

module.exports = Trip
