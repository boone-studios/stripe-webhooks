import chalk from 'chalk'

class Logger {
    /**
     * Log an action event to the console.
     *
     * @param {string} event The event to log to the console.
     * @param {string} adapter The adapter that is logging the event.
     */
    static action(event: string, adapter?: string) {
        const message = adapter ? `[${adapter}] ${event.trim()}` : event
        console.log('⚙️\t', chalk.white(message))
    }

    /**
     * Log an debug event to the console (if in debug mode).
     *
     * @param {string} event The event to log to the console.
     * @param {string} adapter The adapter that is logging the event.
     */
    static debug(event: string, adapter?: string) {
        if (process.env.DEBUG) {
            const message = adapter ? `[${adapter}] ${event.trim()}` : event
            console.log('🐛\t', chalk.gray(message))
        }
    }

    /**
     * Log an error to the console.
     *
     * @param {string} event The event to log to the console.
     * @param {string} adapter The adapter that is logging the event.
     */
    static error(event: string, adapter?: string) {
        const message = adapter ? `[${adapter}] ${event.trim()}` : event
        console.log('😱\t', chalk.red(message))
    }

    /**
     * Log information to the console.
     *
     * @param {string} event The event to log to the console.
     * @param {string} adapter The adapter that is logging the event.
     */
    static info(event: string, adapter?: string) {
        const message = adapter ? `[${adapter}] ${event.trim()}` : event
        console.log('💬\t', chalk.blue(message))
    }

    /**
     * Log a successto the console.
     *
     * @param {string} event The event to log to the console.
     * @param {string} adapter The adapter that is logging the event.
     */
    static success(event: string, adapter?: string) {
        const message = adapter ? `[${adapter}] ${event.trim()}` : event
        console.log('🙂\t', chalk.green(message))
    }

    /**
     * Log a wait to the console.
     *
     * @param {string} event The event to log to the console.
     * @param {string} adapter The adapter that is logging the event.
     */
    static wait(event: string, adapter?: string) {
        const message = adapter ? `[${adapter}] ${event.trim()}` : event
        console.log('☕\t', chalk.white.bold(message))
    }

    /**
     * Log a warning to the console.
     *
     * @param {string} event The event to log to the console.
     * @param {string} adapter The adapter that is logging the event.
     */
    static warn(event: string, adapter?: string) {
        const message = adapter ? `[${adapter}] ${event.trim()}` : event
        console.log('⚠️\t', chalk.yellow(message))
    }
}

export default Logger