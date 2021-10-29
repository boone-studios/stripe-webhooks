import Events from '../events'

import { InvoiceEvent } from '../types/stripe'
import { DispatcherInstance } from '../types/adapters'
import { GenericMessage } from '../types/messages'
import { Response } from '../types/events'

class InvoiceHandler extends Events {
    /**
     * Constructor.
     *
     * @param {DispatcherInstance} adapter Adapter to use.
     */
    constructor(adapter: DispatcherInstance) {
        super(adapter)
    }
    
    /**
     * Handler for 'invoice.created' event.
     *
     * @param {InvoiceEvent} data Stripe event.
     * @return {Response}
     */
    public async created(data: InvoiceEvent): Promise<Response> {
        const amount = (data.amount_due / 100) + ' ' + (data.currency || 'USD')

        let status = 'An'

        switch (data.status) {
            case 'draft':
                status = 'A draft'
                break

            case 'open':
                status = 'An open'
                break

            case 'paid':
                status = 'A paid'
                break

            case 'uncollectible':
                status = 'An uncollectible'
                break

            case 'void':
                status = 'A void'
                break

            default:
                break
        }

        const target: GenericMessage = {
            message: data.amount_due > 0
                ? `:receipt: ${status} invoice for ${amount} was created!`
                : `:receipt: ${status} invoice was created!`,
            title: `Invoice ${data.number}`.trim(),
            url: data.hosted_invoice_url,
        }

        return await this.send(target)
    }
    
    /**
     * Handler for 'invoice.finalized' event.
     *
     * @param {InvoiceEvent} data Stripe event.
     * @return {Response}
     */
    public async finalized(data: InvoiceEvent): Promise<Response> {
        const target: GenericMessage = {
            message: `:receipt: **Invoice ${data.id}** was finalized and is ready for payment.`,
            title: `Invoice ${data.number}`.trim(),
            url: data.hosted_invoice_url,
        }

        return await this.send(target)
    }
    
    /**
     * Handler for 'invoice.paid' event.
     *
     * @param {InvoiceEvent} data Stripe event.
     * @return {Response}
     */
    public async paid(data: InvoiceEvent): Promise<Response> {
        const invoiceStatus = data.amount_remaining > 0 ? 'partially' : 'fully'

        const target: GenericMessage = {
            message: `:receipt: **Invoice ${data.id}** has been ${invoiceStatus} paid.`,
            title: `Invoice ${data.number}`.trim(),
            url: data.hosted_invoice_url,
        }

        return await this.send(target)
    }
    
    /**
     * Handler for 'invoice.payment_failed' event.
     *
     * @param {InvoiceEvent} data Stripe event.
     * @return {Response}
     */
    public async paymentFailed(data: InvoiceEvent): Promise<Response> {
        const target: GenericMessage = {
            message: `:receipt: A payment on **Invoice ${data.id}** was failed.`,
            title: `Invoice ${data.number}`.trim(),
            url: data.hosted_invoice_url,
        }

        return await this.send(target)
    }
    
    /**
     * Handler for 'invoice.sent' event.
     *
     * @param {InvoiceEvent} data Stripe event.
     * @return {Response}
     */
    public async sent(data: InvoiceEvent): Promise<Response> {
        const amount = (data.amount_remaining / 100) + ' ' + (data.currency || 'USD')

        const target: GenericMessage = {
            message: `:e_mail: **Invoice ${data.id}** (${amount}) was sent to **${data.customer_name}**.`,
            title: `Invoice ${data.number}`.trim(),
            url: data.hosted_invoice_url,
        }

        return await this.send(target)
    }
}

export default InvoiceHandler