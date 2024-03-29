const { nanoid } = require('nanoid');
const ModelNotFoundException = require('../exceptions/ModelNotFoundException');

class Model {
  /**
   * @param {Array<import("./Model-definition").Resource>} resources
   * @param {import("./Model-definition").Options} options
   */
  constructor(resources, options = {}) {
    this.resources = resources;
    this.options = {
      name: 'Model',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      ...options,
    };
  }

  all() {
    return this.resources;
  }

  /**
   * @param {import("./Model-definition").Predicate} predicate
   */
  filter(predicate) {
    return this.resources.filter(predicate);
  }

  /**
   * @param {import("./Model-definition").Id} id
   */
  find(id) {
    return this.resources.find((resource) => resource.id === id);
  }

  /**
   * @param {import("./Model-definition").Id} id
   */
  findIndex(id) {
    return this.resources.findIndex((resource) => resource.id === id);
  }

  /**
   * @param {import("./Model-definition").Id} id
   */
  isExists(id) {
    return this.find(id) !== undefined;
  }

  /**
   * @param {import("./Model-definition").Payload} payload
   */
  store(payload) {
    const createdAt = new Date().toISOString();

    /** @type {import("./Model-definition").Resource} */
    const resource = {
      id: nanoid(16),
      [this.options.createdAt]: createdAt,
      [this.options.updatedAt]: createdAt,
      ...payload,
    };

    this.resources.push(resource);

    if (!this.isExists(resource.id)) {
      throw new ModelNotFoundException(this.options.name);
    }

    return resource;
  }

  /**
   * @param {import("./Model-definition").Id} id
   * @param {import("./Model-definition").Payload} payload
   */
  update(id, payload) {
    if (!this.isExists(id)) {
      throw new ModelNotFoundException(this.options.name);
    }

    /** @type {import("./Model-definition").Resource} */
    const resource = {
      [this.options.updatedAt]: new Date().toISOString(),
      ...this.find(id),
      ...payload,
    };

    this.resources[this.findIndex(id)] = resource;

    return resource;
  }

  /**
   * @param {import("./Model-definition").Id} id
   */
  destroy(id) {
    if (!this.isExists(id)) {
      throw new ModelNotFoundException(this.options.name);
    }

    this.resources.splice(this.findIndex(id), 1);

    return true;
  }
}

module.exports = Model;
