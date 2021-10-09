import { Response } from '../types/events'
import { FormattedMessage } from '../types/messages'

interface IDispatcher {
    endpoint: string
    name: string
    send(message: FormattedMessage): Promise<Response>
}

export default IDispatcher
