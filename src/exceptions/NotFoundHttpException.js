const Exception = require('./Exception');

class NotFoundHttpException extends Exception {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message || 'Not Found');

    this.status = 400;
  }
}

NotFoundHttpException.prototype.name = 'NotFoundHttpException';

module.exports = NotFoundHttpException;
