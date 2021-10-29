import { DiscordPayload } from './discord'

export interface GenericMessage {
    message?: string,
    title?: string,
    url?: string,
}

export type FormattedMessage =
    | DiscordPayload
