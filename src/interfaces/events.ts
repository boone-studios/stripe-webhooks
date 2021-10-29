import { GenericMessage } from '../../types/messages'
import { Response } from '../../types/events'

export declare type EventMethod<T> = (data: T) => Promise<Response>

interface IEvents {
    send(message: GenericMessage): Promise<Response>
}

export default IEvents
