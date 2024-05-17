import Hapi from '@hapi/hapi'
import { bookRoutes } from './api/routes.js'

async function main () {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  // Routes
  server.route(bookRoutes)

  // Start server
  server.start().then(() => console.log(`Server dijalankan pada: ${server.info.uri}`))
}

main()
