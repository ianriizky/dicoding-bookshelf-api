const NotFoundHttpException = require('./NotFoundHttpException');

class ModelNotFoundException extends NotFoundHttpException {
  /**
   * @param {string} message
   */
  constructor(model) {
    super(`No query results for model [${model}]`);
  }
}

ModelNotFoundException.prototype.name = 'ModelNotFoundException';

module.exports = ModelNotFoundException;
