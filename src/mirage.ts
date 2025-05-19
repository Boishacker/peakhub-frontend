import { createServer, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', { id: '1', name: 'Admin', email: 'admin@example.com' })
      server.create('user', { id: '2', name: 'User', email: 'user@example.com' })
    },

    routes() {
      this.namespace = 'api'

      this.get('/users', (schema) => {
        return schema.all('user')
      })

      this.get('/users/:id', (schema, request) => {
        const id = request.params.id
        return schema.find('user', id)
      })
    },
  })

  return server
} 