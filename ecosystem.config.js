module.exports = {
    apps : [
        {
            name: 'stripe-webhook',
            script: 'npm',
            automation: false,
            args: 'run serve',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
}
