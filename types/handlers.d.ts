import CustomerHandler from '../src/handlers/customer'
import InvoiceHandler from '../src/handlers/invoice'
import PayoutHandler from '../src/handlers/payout'

export declare type HandlerInstance =
    | typeof CustomerHandler
    | typeof InvoiceHandler
    | typeof PayoutHandler

export declare type Handlers = {
    [key: string]: HandlerInstance
}