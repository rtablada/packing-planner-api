'use strict';

const Item = use('App/Model/Item');
const attributes = ['name', 'ownBox', 'room'];

class ItemController {

  * index(request, response) {
    const items = yield Item.with('trip').fetch();

    response.jsonApi('Item', items);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      trip_id: request.jsonApi.getRelationId('trip'),
    };
    const item = yield Item.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Item', item);
  }

  * show(request, response) {
    const id = request.param('id');
    const item = yield Item.with('trip').where({ id }).firstOrFail();

    response.jsonApi('Item', item);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      trip_id: request.jsonApi.getRelationId('trip'),
    };

    const item = yield Item.with('trip').where({ id }).firstOrFail();
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
