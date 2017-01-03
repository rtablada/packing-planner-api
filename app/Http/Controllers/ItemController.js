'use strict';

const Item = use('App/Model/Item');
const Room = use('App/Model/Room');
const attributes = ['name', 'ownBox', 'room-name'];

class ItemController {

  * index(request, response) {
    const items = yield Item.with('trip', 'room').fetch();

    response.jsonApi('Item', items);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    let room;

    if (input.room_name) {
      room = yield Room.findOrCreate({ name: input.room_name }, { name: input.room_name });


      delete input.room_name;
    }


    const foreignKeys = {
      trip_id: request.jsonApi.getRelationId('trip'),
    };

    if (room) {
      foreignKeys.room_id = room.id;
    } else {
      foreignKeys.room_id = request.jsonApi.getRelationId('room');
    }

    const item = yield Item.create(Object.assign({}, input, foreignKeys));

    yield item.related('room', 'trip').load();

    response.jsonApi('Item', item);
  }

  * show(request, response) {
    const id = request.param('id');
    const item = yield Item.with('trip', 'room').where({ id }).firstOrFail();

    response.jsonApi('Item', item);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    delete input.room_name;

    const foreignKeys = {
      trip_id: request.jsonApi.getRelationId('trip'),
      room_id: request.jsonApi.getRelationId('room'),
    };

    const item = yield Item.with('trip', 'room').where({ id }).firstOrFail();
    item.fill(Object.assign({}, input, foreignKeys));
    yield item.save();

    response.jsonApi('Item', item);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const item = yield Item.query().where({ id }).firstOrFail();
    yield item.delete();

    response.status(204).send();
  }

}

module.exports = ItemController;
