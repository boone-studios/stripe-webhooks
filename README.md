# Stripe Webhook Events

This server receives webhook events from Stripe and then sends them to the respective handlers.

## Installation

```bash
$ git clone git@github.com:boone-software/stripe-webhooks.git
$ npm install
```

**Note:** In production, be sure to have [PM2](https://pm2.keymetrics.io/) installed on the server.

## Adding an Adapter

Create a new adapter file in the *src/adapters* directory:

```ts
import { GenericMessage, FormattedMessage } from './../types/messages'
import Dispatcher from '../dispatcher'

class YourAdapter extends Dispatcher {
    /**
     * Constructor.
     */
    constructor() {
        super()

        this.endpoint = process.env.ADAPTER_WEBHOOK
        this.name = 'Adapter Name'

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

export default YourAdapter
```

Webhook payloads from Stripe are converted into a generic message format, and then passed into the adapter's `format` method. Use the type-hinted `GenericMessage` type to create your own custom message format.
