const got = require('got');
const tunnel = require('tunnel');

const HEADERS = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36'
}

exports.request = function (url) {
    return (async () => {
        const response = await got(url, {
            agent: {
                https: tunnel.httpsOverHttp({
                    headers: HEADERS
                })
            }
        });
        console.log('statusCode:', response.statusCode);
        return response
    })()
}


