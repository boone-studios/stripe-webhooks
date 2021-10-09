import { GenericMessage, FormattedMessage } from './../types/messages'
import Dispatcher from '../dispatcher'

class DiscordAdapter extends Dispatcher {
    /**
     * Constructor.
     */
    constructor() {
        super()

        this.endpoint = process.env.DISCORD_WEBHOOK
        this.name = 'Discord'

        this.headers = {
            'Content-Type': 'application/json',
        }
    }

    /**
     * Format generic message to target platform.
     *
     * @param {GenericMessage} data Generic message to format.
     * @return {FormattedMessage}
     */
    public format(data: GenericMessage): FormattedMessage {
        return {
            content: data.message,
        }
    }
}

export default DiscordAdapter
