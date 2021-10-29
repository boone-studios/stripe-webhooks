import https from 'https'

import IDispatcher from './interfaces/dispatcher'
import { Response } from '../types/events'
import { FormattedMessage } from '../types/messages'

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
     * The type of event.
     *
     * @var {string}
     */
    private type: string

    /**
     * Log output to the console.
     *
     * @param {string} type Type of message.
     * @param {string} message Message to output to console.
     * @param {string} name (Optional) Adapter name.
     * @return {void}
     */
    private logger(type: string, message: string, name?: string): void {
        const adapterName = name || this.name

        switch (type) {
            case 'action':
                console.debug(`⚙️\t[${adapterName}] ${message.trim()}`)
                break

            case 'error':
                console.error(`😱\t[${adapterName}] ${message.trim()}`)
                break

            case 'info':
                console.log(`💬\t[${adapterName}] ${message.trim()}`)
                break

            case 'warn':
                console.warn(`⚠️\t[${adapterName}] ${message.trim()}`)
                break

            case 'debug':
                // Fall through to default

            default:
                if (process.env.DEBUG) {
                    console.debug(`🐛\t[${adapterName}] ${message.trim()}`)
                }
                break
        }
    }

    /**
     * Format the Stripe webhook event and then send the formatted message to the
     * specified webhook.
     *
     * @param {FormattedMessage} message Stripe webhook event.
     * @return {Promise<Response></Response>}
     */
    public async send(message: FormattedMessage): Promise<Response> {
        if (!this.endpoint) {
            throw new Error(`No endpoint specified for adapter "${this.name}"".`)
        }

        this.logger('info', 'Formatted message for adapter.')
        this.logger('action', 'Let\'s send this message!')

        const headers: { [x: string]: any } = {'Content-Type': 'application/json', ...this.headers}

        const options = {
            headers,
            body: JSON.stringify(message),
            method: 'POST',
        }

        return new Promise((resolve, reject) => {
            const request = https.request(this.endpoint, options, (response) => {
                let body: string = ''

                this.logger('info', `Webhook endpoint response: ${response.statusCode}`)

                response.on('data', (chunk) => {
                    this.logger('info', `Response from adapter: ${chunk}`)
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
                this.logger('error', `Error sending message to adapter: ${error.message}`)
                reject(error)
            })

            request.write(options.body)
            request.end()
        })
    }
}

export default Dispatcher
