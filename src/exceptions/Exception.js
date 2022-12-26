class Exception extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message || 'Internal Server Error');

    this.setStatus(500);
  }

  setStatus(status) {
    this.status = status || 500;

    return this;
  }
}

Exception.prototype.name = 'Exception';

module.exports = Exception;
