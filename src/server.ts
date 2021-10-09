import app from './index'

// Initialize the server
app.listen(app.get('port'), (error?: any) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`☕\tServer is listening on port ${app.get('port')}`)
    }
})
