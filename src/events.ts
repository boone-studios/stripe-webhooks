import IEvents from './interfaces/events'

import { DispatcherInstance } from '../types/adapters'
import { GenericMessage, FormattedMessage } from '../types/messages'
import { Response } from '../types/events'

class Events implements IEvents {
    /**
     * Instance of Dispatcher.
     *
     * @var {DispatcherInstance}
     */
    private adapter: DispatcherInstance

    /**
     * Constructor.
     *
     * @param {DispatcherInstance} adapter Adapter to use.
     */
    constructor(adapter: DispatcherInstance) {
        this.adapter = adapter
    }

    /**
     * Send webhook payload through adapter.
     *
     * @param {GenericMessage} message The generic message to format.
     * @return {Response}
     */
    public async send(message: GenericMessage): Promise<Response> {
        const payload: FormattedMessage = this.adapter.format(message)
        return await this.adapter.send(payload)
    }
}

export default Events
