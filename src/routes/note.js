const NoteHandler = require('../handler/NoteHandler');

/**
 * @template {import("@hapi/hapi").ReqRef} Refs
 * @type {import("@hapi/hapi").ServerRoute<Refs> | Array<import("@hapi/hapi").ServerRoute<Refs>>}
 */
const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: NoteHandler.index,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: NoteHandler.store,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: NoteHandler.show,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: NoteHandler.update,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: NoteHandler.destroy,
  },
];

module.exports = routes;
