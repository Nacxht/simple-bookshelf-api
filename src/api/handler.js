import { nanoid } from 'nanoid'
import { booksData as books } from './books.js'

export const addBookHandler = async (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  // Jika properti "name" kosong
  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      })
      .code(400)
  }

  // Jika nilai properti "readPage" lebih besar dari nilai properti "pageCount"
  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      })
      .code(400)
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  // Menambahkan buku ke dalam array
  books.push(newBook)

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id }
    })
    .code(201)
}

export const getAllBookHandler = async (request, h) => {
  const { name, reading, finished } = request.query
  let newBooks = books

  // // Query parameter - Menampilkan buku berdasarkan nama
  if (![name, typeof name].includes('undefined')) {
    newBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
  }

  // Query parameter - Menampilkan buku sedang/tidak dibaca
  if (![reading, typeof reading].includes('undefined')) {
    const isReading = Number(reading) === 1
    newBooks = newBooks.filter((book) => book.reading === isReading)
  }

  // Query parameter - Buku yang belum/sudah selesai dibaca
  if (![finished, typeof finished].includes('undefined')) {
    const condition = Number(finished) === 1
    newBooks = newBooks.filter((book) => book.finished === condition)
  }

  return h
    .response({
      status: 'success',
      data: {
        books: newBooks.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))
      }
    })
    .code(200)
}

export const getBookByIdHandler = async (request, h) => {
  const { bookId } = request.params
  const book = books.filter((book) => book.id === bookId)[0]

  // Jika buku tidak ditemukan
  if (!book) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      })
      .code(404)
  }

  return h
    .response({
      status: 'success',
      data: { book }
    })
    .code(200)
}

export const updateBookByIdHandler = async (request, h) => {
  const { bookId } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updatedAt = new Date().toISOString()
  const bookIndex = books.findIndex((book) => book.id === bookId)

  // Jika properti "name" kosong
  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })
      .code(400)
  }

  // Jika nilai properti "readPage" lebih besar dari nilai properti "pageCount"
  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })
      .code(400)
  }

  // Jika buku tidak ditemukan
  if (bookIndex === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
      })
      .code(404)
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt
  }

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    .code(200)
}

export const deleteBookByIdHandler = async (request, h) => {
  const { bookId } = request.params
  const bookIndex = books.findIndex((book) => book.id === bookId)

  // Jika buku tidak ditemukan
  if (bookIndex === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      })
      .code(404)
  }

  books.splice(bookIndex, 1)

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    .code(200)
}
