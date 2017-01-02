const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Trip extends JsonApiView {
  get attributes() {
    return ['order', 'title', 'complete_date', 'help'];
  }

  items() {
    return this.hasMany('App/Http/JsonApiViews/Item', {
      included: true,
      excludeRelation: 'trip'
    });
  }

}

module.exports = Trip;
