const http = require('http')
const remoteInterface = require('chrome-remote-interface')
const launcher = require('chrome-launcher')

export const chromeFlags = [
    '--no-first-run',
    '--window-size=1366,768'
]

const testChrome = async event => {
    let res

    const chromeOptions = {
        chromeFlags,
        port: 9222,
        ignoreDefaultFlags: true,
        userDataDir: false,
        logLevel: 'verbose'
    }

    const chrome = await launcher.launch(chromeOptions)
    const client = await remoteInterface()
    const { Network, Page, Runtime, Console } = client

    await Network.enable()
    await Runtime.enable()
    await Console.enable()
    await Page.enable()
    await Page.navigate({ url: 'https://example.com' })
    await Page.loadEventFired()

    const statusRes = await Runtime.evaluate({ expression: 'chrome.runtime', awaitPromise: true })

    await client.close()

    return statusRes
};

export const handler = testChrome