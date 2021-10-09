import https from 'https'
import nock from 'nock'
import supertest from 'supertest'

import app from '../src/index'

describe('stripe-webhooks', () => {
    jest.mock('https', () => jest.fn())

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('GET /', async () => {
        const request = supertest(app)
        const response = await request.get('/')

        expect(response.status).toBe(200)
    })

    /*
    test('POST /webhook', async () => {
        const mockRequest: any = {
            id: 'evt_1Ji0cABC9bTCad02k23908EH',
            object: 'event',
            api_version: '2020-08-27',
            created: 1633628585,
            data: {
                object: {
                    id: 'cus_49S03D0A49Am',
                    object: 'customer',
                    address: {
                        city: 'Any City',
                        country: 'US',
                        line1: '123 Any Street',
                        line2: '',
                        postal_code: '12345',
                        state: 'CA',
                    },
                    balance: 0,
                    email: 'nancy.picklefeet@gmail.com',
                    invoice_prefix: '20D92010',
                    name: 'Nancy Picklefeet',
                    livemode: true,
                }
            },
            livemode: true,
            type: 'customer.created',
        }

        console.error = jest.fn()

        const request = supertest(app)

        nock(app.get('host'))
            .post('/webhook')
            .reply(204)

        const response = await request.post('/webhook').send(mockRequest)

        expect(response.status).toBe(200)
        expect(console.error).toHaveBeenCalledTimes(0)
    })
    */
})
