# Stripe Webhook Events

[![Test Stripe Webhooks](https://github.com/boone-software/stripe-webhooks/actions/workflows/tests.yml/badge.svg)](https://github.com/boone-software/stripe-webhooks/actions/workflows/tests.yml)

This server receives webhook events from Stripe and then sends them to the respective handlers.

## Installation

```bash
$ git clone git@github.com:boone-software/stripe-webhooks.git
$ npm install
```

## Usage

To run the server persistently (using [PM2](https://pm2.keymetrics.io/)), run the following command:

```bash
$ npm run start
```

To deploy the server without PM2, run:

```bash
$ npm run serve
```

The server will listen on port 3000.

_Alternatively_, you can use Docker to deploy the server:

```bash
$ docker-compose build
$ docker-compose up
```

## Adapters

The server can be configured to use different adapters to handle different webhook events. These are the adapters that are currently supported:

- [Discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks/)

## Events

There are several events that can be handled by the server:

- `customer.created`
- `invoice.created`
- `invoice.finalized`
- `invoice.paid`
- `invoice.payment_failed`
- `payout.created`
- `payout.failed`

We plan on adding more events in the future, but you can also add more adapters and event handlers by contributing to this project.

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
