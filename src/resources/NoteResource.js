class NoteResource {
  /**
   * @param {Array<import("../models/Note/definition").Resource> | import("../models/Note/definition").Resource} resource
   */
  constructor(resource) {
    this.resource = resource;
  }

  toResource() {
    if (Array.isArray(this.resource)) {
      return this._toArray(this.resource);
    }

    return this._toObject(this.resource);
  }

  /**
   * @param {import("../models/Note/definition").Resource} object
   */
  _toObject(object) {
    return object;
  }

  /**
   * @param {Array<import("../models/Note/definition").Resource>} array
   */
  _toArray(array) {
    return array.map((object) => this._toObject(object));
  }
}

module.exports = NoteResource;
