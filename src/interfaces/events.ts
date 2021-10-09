import { CustomerEvent, InvoiceEvent, PayoutEvent } from '../types/stripe'
import { Response } from '../types/events'

export declare type EventMethod<T> = (data: T) => Promise<Response>

interface IEvents {
    customerCreated: EventMethod<CustomerEvent>
    invoiceCreated: EventMethod<InvoiceEvent>
    payoutCreated: EventMethod<PayoutEvent>
    payoutFailed: EventMethod<PayoutEvent>
}

export default IEvents
