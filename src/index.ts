import { camelCase } from 'lodash'
import dotenv from 'dotenv'
import express from 'express'

import DiscordAdapter from './adapters/discord'
import SlackAdapter from './adapters/slack'

import CustomerHandler from './handlers/customer'
import InvoiceHandler from './handlers/invoice'
import PayoutHandler from './handlers/payout'

import { DispatcherInstance } from '../types/adapters'
import { Handlers } from '../types/handlers'
import { Response } from '../types/events'
import { StripePayload } from '../types/stripe'

import Logger from './util/logger'

// Initialize Express
const app = express()

// Configure app for handling JSON and URL encoding
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import environment variables (if any)
dotenv.config()

// Set default port
app.set('port', process.env.PORT || 3000)

// Define dispatchers and handlers
const dispatchers: DispatcherInstance[] = [
    new DiscordAdapter(),
    // new SlackAdapter(),
]

const handlers: Handlers = {
    customer: CustomerHandler,
    invoice: InvoiceHandler,
    payout: PayoutHandler,
}

// Respond to a health check
app.get('/', (request, response) => {
    return response
        .sendStatus(200)
})

// Register a handler for our custom webhooks
app.post('/webhook', async (request, response) => {
    // Get the payload from Stripe
    const payload: StripePayload = request.body
    const type: string = payload.type

    // Set the response content type ahead of time
    response.set('Content-Type', 'application/json')

    try {
        for (const dispatcher of dispatchers) {
            // Split the event type and instantiate the handler
            const [category, event] = type.split('.')
            const instance: any = new handlers[category](dispatcher)

            // Methods are camel-cased event names
            const methodName = camelCase(event)

            // Make sure the event handler has the handler we're looking for
            if ((dispatcher.events.length === 0 || dispatcher.events.includes(type)) && typeof instance[methodName] === 'function') {
                const output: Response = await instance[event](payload.data.object)

                Logger.success(`Success: ${output.body}`)
            } else {
                Logger.error(`Error: Dispatcher ${dispatcher.constructor.name} does not support event ${type}`)
            }

            return response
                .sendStatus(200)
        }
    } catch (error) {
        // If an error occurs, log it and return a 500
        Logger.error(error.message)

        return response
            .status(500)
            .send(JSON.stringify({ error: error.message }))
    }

    return response
        .sendStatus(200)
})

export default app
