import Events from '../events'

import { PayoutEvent } from '../../types/stripe'
import { DispatcherInstance } from '../../types/adapters'
import { GenericMessage } from '../../types/messages'
import { Response } from '../../types/events'

import { getFormattedDate } from '../util/helpers'

class PayoutHandler extends Events {
    /**
     * Constructor.
     *
     * @param {DispatcherInstance} adapter Adapter to use.
     */
    constructor(adapter: DispatcherInstance) {
        super(adapter)
    }

    /**
     * Handler for 'payout.created' event.
     *
     * @param {PayoutEvent} data Stripe event.
     * @return {Response}
     */
    public async created(data: PayoutEvent): Promise<Response> {
        const amount = (data.amount / 100) + ' ' + (data.currency || 'USD')

        const date = data.arrival_date
            ? 'on ' + getFormattedDate(data.arrival_date)
            : 'in a few days'

        const target: GenericMessage = {
            data,
            message: `:moneybag: A payout of **${amount}** was created and is expected to arrive ${date}!`
        }

        return await this.send(target)
    }

    /**
     * Handler for 'payout.failed' event.
     *
     * @param {PayoutEvent} data Stripe event.
     * @return {Response}
     */
    public async failed(data: PayoutEvent): Promise<Response> {
        const amount = (data.amount / 100) + ' ' + (data.currency || 'USD')

        const date = data.arrival_date
            ? 'on ' + getFormattedDate(data.arrival_date)
            : 'in a few days'

        const target: GenericMessage = {
            data,
            message: `:sad: The payout of **${amount}** that was set to arrive ${date} has failed.`
        }

        return await this.send(target)
    }

    /**
     * Handler for 'payout.paid' event.
     *
     * @param {PayoutEvent} data Stripe event.
     * @return {Response}
     */
    public async paid(data: PayoutEvent): Promise<Response> {
        const amount = (data.amount / 100) + ' ' + (data.currency || 'USD')

        const target: GenericMessage = {
            data,
            message: `:rocket: The payout of **${amount}** has landed!`
        }

        return await this.send(target)
    }
}

export default PayoutHandler