const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Item extends JsonApiView {
  get attributes() {
    return ['name', 'ownBox'];
  }

  trip() {
    return this.belongsTo('App/Http/JsonApiViews/Trip', {
      included: true,
      excludeRelation: 'items',
    });
  }

  room() {
    return this.belongsTo('App/Http/JsonApiViews/Room', {
      included: true,
      excludeRelation: 'items',
    });
  }

}

module.exports = Item;
