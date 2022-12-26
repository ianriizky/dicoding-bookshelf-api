const BadRequestException = require('../exceptions/BadRequestException');
const ModelNotFoundException = require('../exceptions/ModelNotFoundException');
const Book = require('../models/Book');
const BookResource = require('../resources/BookResource');

/** @type {BookHandler} */
let _this;

class BookHandler {
  constructor() {
    if (_this === undefined) {
      this.model = new Book();

      _this = this;
    }
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  index(request, h) {
    const { name, reading, finished } = request.query;

    let books;

    if (name !== undefined || reading !== undefined || finished !== undefined) {
      books = _this.model.filter((book) => {
        book = new BookResource(book).toResource();

        let matchName = false;
        let matchReading = false;
        let matchFinished = false;

        if (name !== undefined) {
          matchName = book.name.toLowerCase().includes(name.toLowerCase());
        }

        if (reading !== undefined) {
          matchReading = book.reading === (reading === '1');
        }

        if (finished !== undefined) {
          matchFinished = book.finished === (finished === '1');
        }

        return matchName || matchReading || matchFinished;
      });
    } else {
      books = _this.model.all();
    }

    return h.response({
      status: 'success',
      data: {
        books: new BookResource(books).all(),
      },
    });
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  store(request, h) {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    try {
      if (name === undefined) {
        throw new BadRequestException(
          'Gagal menambahkan buku. Mohon isi nama buku'
        );
      }

      if (readPage > pageCount) {
        throw new BadRequestException(
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        );
      }

      const book = _this.model.store({
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      });

      return h
        .response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: { bookId: book.id },
        })
        .code(201);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.status);
      }

      return h
        .response({
          status: 'error',
          message: 'Buku gagal ditambahkan',
        })
        .code(500);
    }
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  show(request, h) {
    const { id } = request.params;
    const book = _this.model.find(id);

    if (book === undefined) {
      return h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        })
        .code(404);
    }

    return {
      status: 'success',
      data: { book: new BookResource(book).toResource() },
    };
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  update(request, h) {
    const { id } = request.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    try {
      if (name === undefined) {
        throw new BadRequestException(
          'Gagal memperbarui buku. Mohon isi nama buku'
        );
      }

      if (readPage > pageCount) {
        throw new BadRequestException(
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        );
      }

      _this.model.update(id, {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      });

      return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.status);
      }

      if (error instanceof ModelNotFoundException) {
        return h
          .response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
          })
          .code(error.status);
      }

      return h
        .response({
          status: 'error',
          message: 'Buku gagal diperbarui',
        })
        .code(500);
    }
  }

  /**
   * @template {import("@hapi/hapi").ReqRef} Refs
   * @param {import("@hapi/hapi").Request<Refs>} request
   * @param {import("@hapi/hapi").ResponseToolkit<Refs>} h
   */
  destroy(request, h) {
    const { id } = request.params;

    try {
      _this.model.destroy(id);

      return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        return h
          .response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
          })
          .code(error.status);
      }

      return h
        .response({
          status: 'error',
          message: 'Buku gagal dihapus',
        })
        .code(500);
    }
  }
}

module.exports = BookHandler;
