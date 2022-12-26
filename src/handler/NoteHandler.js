const ModelNotFoundException = require('../exceptions/ModelNotFoundException');
const Note = require('../models/Note');
const NoteResource = require('../resources/NoteResource');

class NoteHandler {
  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  static index(request, h) {
    return h.response({
      status: 'success',
      data: { notes: new NoteResource(new Note().all()).toResource() },
    });
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  static store(request, h) {
    const { title, tags, body } = request.payload;

    const model = new Note();

    try {
      const note = model.store({ title, tags, body });

      return h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: { noteId: note.id },
      });
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        return h
          .response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
          })
          .code(500);
      }

      return h.response({
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  static show(request, h) {
    const { id } = request.params;

    const model = new Note();
    const note = model.find(id);

    if (note === undefined) {
      return h
        .response({
          status: 'fail',
          message: 'Catatan tidak ditemukan',
        })
        .code(404);
    }

    return {
      status: 'success',
      data: { note },
    };
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  static update(request, h) {
    const { id } = request.params;
    const { title, tags, body } = request.payload;

    const model = new Note();

    try {
      model.update(id, { title, tags, body });

      return h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        return h.response({
          status: 'fail',
          message: 'Gagal memperbarui catatan. Id tidak ditemukan',
        });
      }

      return h.response({
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  static destroy(request, h) {
    const { id } = request.params;

    const model = new Note();

    try {
      model.destroy(id);

      return h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        return h.response({
          status: 'fail',
          message: 'Catatan gagal dihapus. Id tidak ditemukan',
        });
      }

      return h.response({
        status: 'fail',
        message: error.message,
      });
    }
  }
}

module.exports = NoteHandler;
