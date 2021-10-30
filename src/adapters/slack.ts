import { GenericMessage, FormattedMessage } from '../../types/messages'
import Dispatcher from '../dispatcher'

class SlackAdapter extends Dispatcher {
    /**
     * Events that this dispatcher supports. If empty, all events are supported.
     *
     * @var {string[]}
     */
    public readonly events: string[] = []

    /**
     * Constructor.
     */
    constructor() {
        super()

        this.endpoint = process.env.SLACK_WEBHOOK
        this.name = 'Slack'

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
            text: data.message,
        }
    }
}

export default SlackAdapter
