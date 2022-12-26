class BookResource {
  /**
   * @param {Array<import("../models/Book/definition").Resource> | import("../models/Book/definition").Resource} resource
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

  all() {
    const generate =
      /**
       * @param {import("../models/Book/definition").Resource} object
       */
      (object) => ({
        id: object.id,
        name: object.name,
        publisher: object.publisher,
      });

    if (Array.isArray(this.resource)) {
      return this._toArray(this.resource).map((object) => generate(object));
    }

    return generate(this._toObject(this.resource));
  }

  /**
   * @param {import("../models/Book/definition").Resource} object
   */
  _toObject(object) {
    return {
      ...object,
      finished: object.pageCount === object.readPage,
    };
  }

  /**
   * @param {Array<import("../models/Book/definition").Resource>} array
   */
  _toArray(array) {
    return array.map((object) => this._toObject(object));
  }
}

module.exports = BookResource;
