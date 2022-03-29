import { isValid, parseISO } from 'date-fns'
import { format, OptionsWithTZ, toDate } from 'date-fns-tz'

import { DateInput } from '../../types/utils'
import * as currencies from './currencies.json'

/**
 * Format a Date instance into a string.
 *
 * @param {DateInput} timestamp Timestamp to format.
 * @param {string} timeZone Timezone to format the timestamp in.
 * @return {string | MomentInput}
 */
export function getFormattedDate(timestamp: DateInput, timeZone?: string): DateInput {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const options: OptionsWithTZ = typeof timeZone === 'string' ? { timeZone } : { timeZone: tz }

    let date = timestamp

    // Assume numeric values are Unix epoch timestamps
    // WARNING: JavaScript timestamps are always in larger units
    // and will be converted to astronomical dates!
    if (typeof timestamp === 'number') {
        date = toDate((timestamp as number) * 1000)
    }

    // Grab the formatted date from a string
    if (typeof timestamp === 'string') {
        date = parseISO(timestamp as string)
    }

    // If we have a valid date, format it
    return isValid(date) ? format(date as Date, 'P', options) : timestamp
}

/**
 * Format currency by a specified format string.
 *
 * @param {number } amount The amount to format.
 * @param {string} currency The currency code.
 * @returns  {string}
 */
export function getFormattedCurrency(amount: number, currency: string): string {
    const currencyCode: string = currency.toUpperCase()
    let negative: boolean = false

    const format: string = (currencies as unknown as string[])[currencyCode as any]['format' as any]

    // If no formatting string supplied
    // or amount is not a number, return as is
    if (!format || !Number.isFinite(amount) || !currencies.hasOwnProperty(currencyCode)) {
        return String(amount)
    }

    // Extract placeholders from format string
    const formatted = format
        .match(/\#(.*)\#/g)
        .pop()
        .split('')
        .reverse()

    // Is number negative?
    if (amount < 0) {
        negative = true
        amount = Math.abs(amount)
    }

    // Remove any decimals, split, and flip the numbers
    const withoutDecimals = amount
        .toString()
        .replace(/[ ,.]/, '')
        .split('')
        .reverse()

    // Add leading zeros to small amounts, if there's a separator in last 3 digits
    if (withoutDecimals.length < 3 && currency.slice(-3).match(/[ ,.]/)) {
        while (3 - withoutDecimals.length) {
            withoutDecimals.unshift('0')
        }
    }

    // Loop through the formatting, and look for separators
    // Only get separators that fit within the length of the amount
    for (let i = 0; i < withoutDecimals.length; i++) {
        // If we find a matching separator, splice it into the amount in the same place
        if (/[ ,.]/.test(formatted[i])) {
            withoutDecimals.splice(i, 0, formatted[i])
        }
    }

    // Flip the amount back in the right direction, and rejoin
    const correctedAmount = withoutDecimals.reverse().join('')

    // Handle Negatives (minus or parentheses)
    return (!negative)
        ? format.replace(/\#(.*)\#/g, correctedAmount).replace(/[\-\(\)]/gi, '')
        : format.replace(/\#(.*)\#/g, correctedAmount)
}
