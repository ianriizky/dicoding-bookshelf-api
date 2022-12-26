const NoteHandler = require('../handler/NoteHandler');

const handler = new NoteHandler();

/**
 * @template {import("@hapi/hapi").ReqRef} Refs
 * @type {import("@hapi/hapi").ServerRoute<Refs> | Array<import("@hapi/hapi").ServerRoute<Refs>>}
 */
const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: handler.index,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: handler.store,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.show,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.update,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.destroy,
  },
];

module.exports = routes;
