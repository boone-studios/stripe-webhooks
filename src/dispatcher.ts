import https from 'https'

import IDispatcher from './interfaces/dispatcher'
import { Response } from '../types/events'
import { FormattedMessage } from '../types/messages'

import Logger from './util/logger'

class Dispatcher implements IDispatcher {
    /**
     * The adapter endpoint.
     *
     * @var {string}
     */
    public endpoint: string

    /**
     * Request headers for endpoint.
     *
     * @var {object}
     */
    public headers: object = {}

    /**
     * The adapter name.
     *
     * @var {string}
     */
    public name: string = 'Dispatcher'

    /**
     * The path to the endpoint.
     *
     * @var {string}
     */
    public path: string = '/'

    /**
     * The type of event.
     *
     * @var {string}
     */
    private type: string

    /**
     * Format the Stripe webhook event and then send the formatted message to the
     * specified webhook.
     *
     * @param {FormattedMessage} message Stripe webhook event.
     * @return {Promise<Response>}
     */
    public async send(message: FormattedMessage): Promise<Response> {
        if (!this.endpoint) {
            throw new Error(`No endpoint specified for adapter "${this.name}"".`)
        }

        Logger.info('Formatted message for adapter.', this.name)
        Logger.action('Let\'s send this message!', this.name)

        const headers: { [x: string]: any } = {
            'Content-Type': 'application/json',
            path: this.path,
            ...this.headers
        }

        const options = {
            headers,
            body: JSON.stringify(message),
            method: 'POST',
        }

        return new Promise((resolve, reject) => {
            const request = https.request(this.endpoint, options, (response) => {
                let body: string = ''

                Logger.info(`Webhook endpoint response: ${response.statusCode}`, this.name)

                response.on('data', (chunk) => {
                    Logger.info(`Response from adapter: ${chunk}`, this.name)
                    body += chunk.toString()
                })

                response.on('end', () => {
                    if (response.statusCode >= 200 && response.statusCode <= 299) {
                        return resolve({
                            body: (body.trim() !== '' ? body.trim : 'OK') as string,
                            headers: response.headers,
                            statusCode: response.statusCode,
                        })
                    }

                    return reject(`Request failed with status code ${response.statusCode}.`)
                })
            })

            request.on('error', (error) => {
                Logger.error(`Error sending message to adapter: ${error.message}`, this.name)
                reject(error)
            })

            request.write(options.body)
            request.end()
        })
    }
}

export default Dispatcher
