require('global-agent/bootstrap')
let proxy = require('./config').PROXY
if (proxy) {
    global.GLOBAL_AGENT.HTTP_PROXY = proxy;
    global.GLOBAL_AGENT.HTTPS_PROXY = proxy;
}
