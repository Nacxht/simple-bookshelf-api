import { addBookHandler, deleteBookByIdHandler, getAllBookHandler, getBookByIdHandler, updateBookByIdHandler } from './handler.js'

export const bookRoutes = [
  // Menyimpan buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },

  // Menampilkan semua buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler
  },

  // Menampilkan detail buku
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler
  },

  // Mengubah data buku
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookByIdHandler
  },

  // Menghapus buku
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler
  }
]
