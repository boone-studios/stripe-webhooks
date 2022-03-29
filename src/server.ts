import app from './index'

import Logger from './util/logger'

// Initialize the server
app.listen(app.get('port'), (error?: any) => {
    if (error) {
        Logger.error(error)
    } else {
        Logger.wait(`Server is listening on port ${app.get('port')}`)
    }
})
