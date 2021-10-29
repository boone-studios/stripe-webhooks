import Events from '../events'

import { CustomerEvent } from '../types/stripe'
import { DispatcherInstance } from '../types/adapters'
import { Response } from '../types/events'

class Customer extends Events {
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
        const target = {
            message: `:tada: New customer **${data.name}** created!`,
        }

        return await this.send(target)
    }
}

export default Customer