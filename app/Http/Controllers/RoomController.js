'use strict';

const Room = use('App/Model/Room');
const attributes = ['name'];

class RoomController {

  * index(request, response) {
    const rooms = yield Room.with().fetch();

    response.jsonApi('Room', rooms);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const room = yield Room.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Room', room);
  }

  * show(request, response) {
    const id = request.param('id');
    const room = yield Room.with().where({ id }).firstOrFail();

    response.jsonApi('Room', room);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const room = yield Room.with().where({ id }).firstOrFail();
    room.fill(Object.assign({}, input, foreignKeys));
    yield room.save();

    response.jsonApi('Room', room);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const room = yield Room.query().where({ id }).firstOrFail();
    yield room.delete();

    response.status(204).send();
  }

}

module.exports = RoomController;
