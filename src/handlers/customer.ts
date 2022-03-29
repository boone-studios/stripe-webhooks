import Events from '../events'

import { CustomerEvent, SubscriptionEvent } from '../../types/stripe'
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
            data,
            message: `:tada: New customer **${data.name}** created!`,
        }

        return await this.send(target)
    }

    /**
     * Handler for `customer.subscription.created` event.
     *
     * @param {SubscriptionEvent} data Stripe event.
     * @returns {Response}
     */
    public async subscriptionCreated(data: SubscriptionEvent): Promise<Response> {
        const target: GenericMessage = {
            data,
            message: `:yay: A customer just subscribed (for real life!)`,
        }

        return await this.send(target)
    }
}

export default CustomerHandler