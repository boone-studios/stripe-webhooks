import { DiscordPayload, SlackPayload} from './payloads'
import { StripeWebhookEvent } from './stripe'

export interface GenericMessage {
    data?: StripeWebhookEvent
    message?: string,
    path?: string,
    title?: string,
    url?: string,
}

export type FormattedMessage =
    | DiscordPayload
    | SlackPayload
