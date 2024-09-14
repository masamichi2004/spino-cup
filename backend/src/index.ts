import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 8080
// @ts-ignore
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
