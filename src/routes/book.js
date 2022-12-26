const BookHandler = require('../handler/BookHandler');

const handler = new BookHandler();

/**
 * @template {import("@hapi/hapi").ReqRef} Refs
 * @type {import("@hapi/hapi").ServerRoute<Refs> | Array<import("@hapi/hapi").ServerRoute<Refs>>}
 */
const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: handler.index,
  },
  {
    method: 'POST',
    path: '/books',
    handler: handler.store,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: handler.show,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handler.update,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handler.destroy,
  },
];

module.exports = routes;
