import { isValid, parseISO } from 'date-fns'
import { format, OptionsWithTZ, toDate, zonedTimeToUtc } from 'date-fns-tz'

import { DateInput } from '../types/utils'

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
