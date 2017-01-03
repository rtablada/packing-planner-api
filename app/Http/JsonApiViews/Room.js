const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Room extends JsonApiView {
  get attributes() {
    return ['name'];
  }

  items() {
    return this.hasMany('App/Http/JsonApiViews/Item', {
      included: true,
      excludeRelation: 'room',
    });
  }

}

module.exports = Room;
