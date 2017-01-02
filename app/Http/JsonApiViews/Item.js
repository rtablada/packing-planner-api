const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Item extends JsonApiView {
  get attributes() {
    return ['name', 'ownBox', 'room'];
  }

  trip() {
    return this.belongsTo('App/Http/JsonApiViews/Trip', {
      included: true,
      excludeRelation: 'items'
    });
  }

}

module.exports = Item;
