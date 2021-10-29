import Events from '../events'

import { CustomerEvent } from '../../types/stripe'
import { DispatcherInstance } from '../../types/adapters'
import { GenericMessage } from '../../types/messages'
import { Response } from '../../types/events'

class CustomerHandler extends Events {
    /**
     * Constructor.
     *
     * @param {DispatcherInstance} adapter Adapter to use.
     */
    constructor(adapter: DispatcherInstance) {
        super(adapter)
    }

    /**
     * Handler for 'customer.created' event.
     *
     * @param {CustomerEvent} data Stripe event.
     * @return {Response}
     */
    public async created(data: CustomerEvent): Promise<Response> {
        const target: GenericMessage = {
            message: `:tada: New customer **${data.name}** created!`,
        }

        return await this.send(target)
    }
}

export default CustomerHandler