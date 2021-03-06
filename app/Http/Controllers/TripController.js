'use strict';

const Trip = use('App/Model/Trip');
const Database = use('Database');
const attributes = ['order', 'title', 'complete-date', 'help'];

class TripController {

  * index(request, response) {
    const trips = yield Trip.with('items.room').fetch();

    response.jsonApi('Trip', trips);
  }

  * store(request, response) {
    const { count } = yield Database.table('trips').count('id as count').first();

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const trip = yield Trip.create(Object.assign({}, input, { order: count }));


    response.jsonApi('Trip', trip);
  }

  * show(request, response) {
    const id = request.param('id');
    const trip = yield Trip.with('items').where({ id }).firstOrFail();

    response.jsonApi('Trip', trip);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const trip = yield Trip.with('items').where({ id }).firstOrFail();
    trip.fill(Object.assign({}, input, foreignKeys));
    yield trip.save();

    response.jsonApi('Trip', trip);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const trip = yield Trip.query().where({ id }).firstOrFail();
    yield trip.delete();

    response.status(204).send();
  }

}

module.exports = TripController;
