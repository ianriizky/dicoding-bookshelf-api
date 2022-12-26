const Exception = require('./Exception');

class BadRequestException extends Exception {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message || 'Not Found');

    this.status = 400;
  }
}

BadRequestException.prototype.name = 'BadRequestException';

module.exports = BadRequestException;
