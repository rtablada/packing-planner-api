const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Room extends JsonApiView {
  get attributes() {
    return ['name'];
  }

}

module.exports = Room;
