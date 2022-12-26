const Model = require('../Model');

/**
 * @type {Array<import("./definition").Resource>}
 */
const resources = [];

class Book extends Model {
  constructor() {
    super(resources, { name: 'Book', createdAt: 'insertedAt' });
  }

  /**
   * @returns {Array<import("./definition").Resource>}
   */
  all() {
    return super.all();
  }

  /**
   * @param {import("./definition").Predicate} predicate
   * @returns {Array<import("./definition").Resource>}
   */
  filter(predicate) {
    return super.filter(predicate);
  }

  /**
   * @param {import("./definition").Id} id
   * @returns {import("./definition").Resource}
   */
  find(id) {
    return super.find(id);
  }

  /**
   * @param {import("./definition").Id} id
   */
  findIndex(id) {
    return super.findIndex(id);
  }

  /**
   * @param {import("./definition").Id} id
   */
  isExists(id) {
    return super.isExists(id);
  }

  /**
   * @param {import("./definition").Payload} payload
   * @returns {import("./definition").Resource}
   */
  store(payload) {
    return super.store(payload);
  }

  /**
   * @param {import("./definition").Id} id
   * @param {import("./definition").Payload} payload
   * @returns {import("./definition").Resource}
   */
  update(id, payload) {
    return super.update(id, payload);
  }

  /**
   * @param {import("./definition").Id} id
   */
  destroy(id) {
    return super.destroy(id);
  }
}

module.exports = Book;
